<script setup lang="ts">
import { markRaw, nextTick, onMounted, ref, useAttrs } from 'vue'

import {
    type RectangleEmits,
    type RectangleProps,
    rectanglePropsDefaults,
    setupRectangle
} from '../functions/rectangle'
import { AddLayerInjection } from '../types/injectionKeys'
import { assertInject, propsBinder, remapEvents } from '../utils'
import { LatLngBounds, Rectangle } from 'leaflet'

/**
 * > Easily draw a rectangle on the map
 * @demo RectangleDemo {13-29}
 */
defineOptions({})
const props = withDefaults(defineProps<RectangleProps>(), rectanglePropsDefaults)
const emit = defineEmits<RectangleEmits>()

const { ready, leafletObject } = useRectangle()
defineExpose({
    /**
     * Indicates whether the component and its underlying Leaflet object are fully initialized.
     * @type {Ref<boolean>}
     */
    ready,
    /**
     * The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state).
     * @type {Ref<Rectangle \| undefined>}
     */
    leafletObject
})

function useRectangle() {
    const leafletObject = ref<Rectangle>()
    const ready = ref<boolean>(false)

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
        @slot Used to inject Leaflet child components like `<LPopup>` or `<LTooltip>` into the `LRectangle`.
        -->
        <slot />
    </div>
</template>
