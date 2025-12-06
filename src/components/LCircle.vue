<script setup lang="ts">
import { Circle } from 'leaflet'
import { markRaw, nextTick, onMounted, ref, useAttrs } from 'vue'

import { AddLayerInjection } from '@/types/injectionKeys'
import { assertInject, propsBinder, remapEvents } from '@/utils'
import {
    type CircleEmits,
    type CircleProps,
    circlePropsDefaults,
    setupCircle
} from '@/functions/circle'

/**
 * > Draw a path in the shape of a circle around a center positioned at `latLng` coordinates.
 *
 * > It's an approximation and starts to diverge from a real circle closer to the poles (due to projection distortion).
 * @demo circle {12}
 */
defineOptions({ name: 'LCircle' })
const props = withDefaults(defineProps<CircleProps>(), circlePropsDefaults)
const emit = defineEmits<CircleEmits>()

const { ready, leafletObject } = useCircleMarker()

defineExpose({
    /**
     * Indicates whether the component and its underlying Leaflet object are fully initialized.
     * @type {Ref<boolean>}
     */
    ready,
    /**
     * The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state).
     * @type {Ref<Circle \| undefined>}
     */
    leafletObject
})

function useCircleMarker() {
    const leafletObject = ref<Circle>()
    const ready = ref<boolean>(false)

    const addLayer = assertInject(AddLayerInjection)

    const { options, methods } = setupCircle(props, leafletObject, emit)

    onMounted(async () => {
        leafletObject.value = markRaw<Circle>(new Circle(props.latLng, options))

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
        @slot Used to inject Leaflet child components like `<LPopup>` or `<LTooltip>` into the `LCircle`.
        -->
        <slot />
    </div>
</template>
