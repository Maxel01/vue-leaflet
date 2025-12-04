<script setup lang="ts">
import { VideoOverlay } from 'leaflet'
import { computed, markRaw, nextTick, onMounted, ref, useAttrs } from 'vue'

import {
    setupVideoOverlay,
    type VideoOverlayEmits,
    type VideoOverlayProps,
    videoOverlayPropsDefaults
} from '@/functions/videoOverlay'
import { AddLayerInjection } from '@/types/injectionKeys'
import { assertInject, propsBinder, remapEvents } from '@/utils'

/**
 * > Used to load and display a video over specific bounds of the map.
 * @demo video-overlay {5-9,19}
 */
defineOptions({ name: 'LVideoOverlay' })
const props = withDefaults(defineProps<VideoOverlayProps>(), videoOverlayPropsDefaults)
const emit = defineEmits<VideoOverlayEmits>()

const { ready, leafletObject, videoRoot } = useVideoOverlay()
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
    const videoRoot = ref<HTMLDivElement>()
    const video = computed(() => {
        const video = videoRoot.value?.firstElementChild
        return video?.tagName === 'svg' ? (video as HTMLVideoElement) : undefined
    })

    const addLayer = assertInject(AddLayerInjection)

    const { options, methods } = setupVideoOverlay(props, leafletObject, emit)

    onMounted(async () => {
        if (!video.value && !props.video) {
            console.warn('Missing video prop or slot: VideoOverlay has not been created.')
            return
        }
        leafletObject.value = markRaw<VideoOverlay>(
            new VideoOverlay(video.value ? video.value : props.video!, props.bounds, options)
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

    return { ready, leafletObject, videoRoot }
}
</script>

<template>
    <div v-if="ready" style="display: none">
        <!--
        @slot Used to inject Leaflet child components like `<LPopup>` or `<LTooltip>` into the `LVideoOverlay`.
        -->
        <slot />
    </div>
    <div style="display: none" ref="videoRoot">
        <!--
       @slot Place your `HtmlVideoElement` inside this slot. Be aware that `props.video` will be ignored, when this slot is used. Replacing the `HtmlVideoElement` is not reactive.
       -->
        <slot name="video" />
    </div>
</template>
