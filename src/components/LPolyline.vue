<script setup lang="ts">
import { markRaw, nextTick, onMounted, ref, useAttrs } from 'vue'
import {
    type PolylineEmits,
    type PolylineProps,
    polylinePropsDefaults,
    setupPolyline
} from '../functions/polyline'
import { AddLayerInjection } from '../types/injectionKeys'
import { assertInject, propsBinder, remapEvents } from '../utils'
import { Polyline } from 'leaflet'

/**
 * > Easily draw a polyline on the map
 * @demo PolylineDemo {12-20}
 */
defineOptions({})
const props = withDefaults(defineProps<PolylineProps>(), polylinePropsDefaults)
const emit = defineEmits<PolylineEmits>()

const { ready, leafletObject } = usePolyline()
defineExpose({
    /**
     * Indicates whether the component and its underlying Leaflet object are fully initialized.
     * @type {Ref<boolean>}
     */
    ready,
    /**
     * The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state).
     * @type {Ref<Polyline \| undefined>}
     */
    leafletObject
})

function usePolyline() {
    const leafletObject = ref<Polyline>()
    const ready = ref(false)

    const addLayer = assertInject(AddLayerInjection)

    const { options, methods } = setupPolyline(props, leafletObject, emit)

    onMounted(async () => {
        leafletObject.value = markRaw<Polyline>(new Polyline(props.latLngs, options))

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
        @slot Used to inject Leaflet child components like `<LPopup>` or `<LTooltip>` into the `LPolyline`.
        -->
        <slot />
    </div>
</template>
