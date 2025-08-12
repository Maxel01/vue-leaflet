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

/**
 * > Used to load and display a video over specific bounds of the map.
 * @demo VideoOverlayDemo {7-11,16-21}
 */
defineOptions({})
const props = withDefaults(defineProps<VideoOverlayProps>(), videoOverlayPropsDefaults)
const emit = defineEmits<VideoOverlayEmits>()

const { ready, leafletObject } = useVideoOverlay()
defineExpose({
    /**
     * Indicates whether the component and its underlying Leaflet object are fully initialized.
     * @type {Ref<boolean>}
     */
    ready,
    /**
     * The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state).
     * @type {Ref<VideoOverlay \| undefined>}
     */
    leafletObject
})

function useVideoOverlay() {
    const leafletObject = ref<VideoOverlay>()
    const ready = ref<boolean>(false)

    const addLayer = assertInject(AddLayerInjection)

    const { options, methods } = setupVideoOverlay(props, leafletObject, emit)

    onMounted(async () => {
        leafletObject.value = markRaw<VideoOverlay>(
            new VideoOverlay(props.video, props.bounds, options)
        )

        const { listeners } = remapEvents(useAttrs())
        leafletObject.value.on(listeners)
        propsBinder(methods, leafletObject.value, props)
        addLayer({
            ...props,
            ...methods,
            leafletObject: leafletObject.value
        })
        ready.value = true
        nextTick(() => emit('ready', leafletObject.value!))
    })

    return { ready, leafletObject }
}
</script>

<template>
    <div v-if="ready" style="display: none">
        <!--
        @slot Used to inject Leaflet child components like `<LPopup>` or `<LTooltip>` into the `LCircleMarker`.
        -->
        <slot />
    </div>
</template>
