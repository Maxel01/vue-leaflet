<script setup lang="ts">
import {
    type PolygonEmits,
    type PolygonProps,
    polygonPropsDefaults,
    setupPolygon
} from '@/functions/polygon'
import { AddLayerInjection } from '@/types/injectionKeys'
import { assertInject, propsBinder, remapEvents } from '@/utils'
import { Polygon } from 'leaflet'
import { markRaw, nextTick, onMounted, ref, useAttrs } from 'vue'

/**
 * > Easily draw a polygon on the map
 * @demo polygon {12-23}
 */
defineOptions({ name: 'LPolygon' })
const props = withDefaults(defineProps<PolygonProps>(), polygonPropsDefaults)
const emit = defineEmits<PolygonEmits>()

const { ready, leafletObject } = usePolygon()
defineExpose({
    /**
     * Indicates whether the component and its underlying Leaflet object are fully initialized.
     * @type {Ref<boolean>}
     */
    ready,
    /**
     * The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state).
     * @type {Ref<Polygon \| undefined>}
     */
    leafletObject
})

function usePolygon() {
    const leafletObject = ref<Polygon>()
    const ready = ref(false)

    const addLayer = assertInject(AddLayerInjection)

    const { options, methods } = setupPolygon(props, leafletObject, emit)

    onMounted(async () => {
        leafletObject.value = markRaw<Polygon>(new Polygon(props.latLngs, options))

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
        @slot Used to inject Leaflet child components like `<LPopup>` or `<LTooltip>` into the `LPolygon`.
        -->
        <slot />
    </div>
</template>
