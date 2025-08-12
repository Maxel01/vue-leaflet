<script setup lang="ts">
import { SVGOverlay } from 'leaflet'
import { markRaw, nextTick, onMounted, ref, useAttrs } from 'vue'
import { AddLayerInjection } from '../types/injectionKeys'
import { assertInject, propsBinder, remapEvents } from '../utils'
import {
    setupSVGOverlay,
    type SVGOverlayEmits,
    type SVGOverlayProps,
    svgOverlayPropsDefaults
} from '../functions/svgOverlay'

/**
 * > Used to load and display a single svg over specific bounds of the map.
 * @demo SVGOverlayDemo {7-21,37}
 */
defineOptions({})
const props = withDefaults(defineProps<SVGOverlayProps>(), svgOverlayPropsDefaults)
const emit = defineEmits<SVGOverlayEmits>()

const { ready, leafletObject } = useSVGOverlay()
defineExpose({
    /**
     * Indicates whether the component and its underlying Leaflet object are fully initialized.
     * @type {Ref<boolean>}
     */
    ready,
    /**
     * The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state).
     * @type {Ref<SVGOverlay \| undefined>}
     */
    leafletObject
})

function useSVGOverlay() {
    const leafletObject = ref<SVGOverlay>()
    const ready = ref(false)

    const addLayer = assertInject(AddLayerInjection)

    const { options, methods } = setupSVGOverlay(props, leafletObject, emit)

    onMounted(async () => {
        leafletObject.value = markRaw<SVGOverlay>(new SVGOverlay(props.svg, props.bounds, options))

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
