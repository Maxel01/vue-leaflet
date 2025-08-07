<script setup lang="ts">
import { VideoOverlay } from 'leaflet'
import { markRaw, nextTick, onMounted, ref, useAttrs } from 'vue'

import { AddLayerInjection } from '../types/injectionKeys'
import { assertInject, propsBinder, remapEvents } from '../utils.js'
import {
    setupVideoOverlay,
    type VideoOverlayEmits,
    type VideoOverlayProps,
    videoOverlayPropsDefaults
} from '../functions/videoOverlay.ts'

const props = withDefaults(defineProps<VideoOverlayProps>(), videoOverlayPropsDefaults)
const emit = defineEmits<VideoOverlayEmits>()

const { ready, leafletObject } = useVideoOverlay()
defineExpose({ ready, leafletObject })

function useVideoOverlay() {
    const leafletObject = ref<VideoOverlay>()
    const ready = ref(false)

    const addLayer = assertInject(AddLayerInjection)

    const { options, methods } = setupVideoOverlay(props, leafletObject, emit)

    onMounted(async () => {
        leafletObject.value = markRaw<VideoOverlay>(
            new VideoOverlay(props.video, props.bounds, options),
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
