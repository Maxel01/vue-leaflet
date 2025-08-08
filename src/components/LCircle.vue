<script setup lang="ts">
import { Circle } from 'leaflet'
import { markRaw, nextTick, onMounted, ref, useAttrs } from 'vue'

import { AddLayerInjection } from '../types/injectionKeys'
import { assertInject, propsBinder, remapEvents } from '../utils.js'
import { setupCircle, type CircleEmits, type CircleProps, circlePropsDefaults } from '../functions/circle.ts'

const props = withDefaults(defineProps<CircleProps>(), circlePropsDefaults)
const emit = defineEmits<CircleEmits>()

const { ready, leafletObject } = useCircleMarker()
defineExpose({ ready, leafletObject })

function useCircleMarker() {
    const leafletObject = ref<Circle>()
    const ready = ref(false)

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
        <!--
        @slot Used to inject Leaflet child components like `<LPopup>` or `<LTooltip>` into the `LCircleMarker`.
        -->
        <slot />
    </div>
</template>
