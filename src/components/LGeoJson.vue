<script setup lang="ts">
import { markRaw, nextTick, onMounted, ref, useAttrs } from 'vue'

import { AddLayerInjection } from '../types/injectionKeys'
import { assertInject, propsBinder, remapEvents } from '../utils.js'
import { type GeoJSONEmits, type GeoJSONProps, geoJSONPropsDefaults, setupGeoJSON } from '../functions/geoJSON.ts'
import { GeoJSON } from 'leaflet'

const props = withDefaults(defineProps<GeoJSONProps>(), geoJSONPropsDefaults)
const emit = defineEmits<GeoJSONEmits>()

const { ready, leafletObject } = useGeoJson()
defineExpose({ ready, leafletObject })

function useGeoJson() {
    const leafletObject = ref<GeoJSON>()
    const ready = ref(false)

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
            leafletObject: leafletObject.value,
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
