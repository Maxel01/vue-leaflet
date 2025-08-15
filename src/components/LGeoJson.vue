<script setup lang="ts">
import { markRaw, nextTick, onMounted, ref, useAttrs } from 'vue'

import { AddLayerInjection } from '@/types/injectionKeys'
import { assertInject, propsBinder, remapEvents } from '@/utils'
import {
    type GeoJSONEmits,
    type GeoJSONProps,
    geoJSONPropsDefaults,
    setupGeoJSON
} from '@/functions/geoJSON'
import { GeoJSON } from 'leaflet'

/**
 * > Represents a GeoJSON object or an array of GeoJSON objects.
 * @demo geo-json {5-8,11-14,25}
 */
defineOptions({})
const props = withDefaults(defineProps<GeoJSONProps>(), geoJSONPropsDefaults)
const emit = defineEmits<GeoJSONEmits>()

const { ready, leafletObject } = useGeoJson()
defineExpose({
    /**
     * Indicates whether the component and its underlying Leaflet object are fully initialized.
     * @type {Ref<boolean>}
     */
    ready,
    /**
     * The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state).
     * @type {Ref<GeoJSON \| undefined>}
     */
    leafletObject
})

function useGeoJson() {
    const leafletObject = ref<GeoJSON>()
    const ready = ref<boolean>(false)

    const addLayer = assertInject(AddLayerInjection)

    const { methods, options } = setupGeoJSON(props, leafletObject, emit)

    onMounted(async () => {
        leafletObject.value = markRaw<GeoJSON>(new GeoJSON(props.geojson, options))

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
    <div v-if="ready" ref="root" style="display: none"></div>
</template>
