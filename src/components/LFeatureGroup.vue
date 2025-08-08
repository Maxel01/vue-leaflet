<script setup lang="ts">
import { FeatureGroup } from 'leaflet'
import { markRaw, nextTick, onMounted, ref, useAttrs } from 'vue'

import { AddLayerInjection } from '../types/injectionKeys'
import { assertInject, propsBinder, remapEvents } from '../utils.js'
import {
    type FeatureGroupEmits,
    type FeatureGroupProps,
    featureGroupPropsDefaults,
    setupFeatureGroup,
} from '../functions/featureGroup.ts'

const props = withDefaults(defineProps<FeatureGroupProps>(), featureGroupPropsDefaults)
const emit = defineEmits<FeatureGroupEmits>()

const { ready, leafletObject } = useFeatureGroup()
defineExpose({
    /**
     * Indicates whether the component and its underlying Leaflet object are fully initialized.
     * @type {Ref<boolean>}
     */
    ready,
    /**
     * The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state).
     * @type {Ref<FeatureGroup \| undefined>}
     */
    leafletObject
})

function useFeatureGroup() {
    const leafletObject = ref<FeatureGroup>()
    const ready = ref(false)

    const addLayer = assertInject(AddLayerInjection)

    const { methods, options } = setupFeatureGroup(props, leafletObject, emit)

    onMounted(async () => {
        leafletObject.value = markRaw<FeatureGroup>(new FeatureGroup(undefined, options))

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
        @slot ?
        -->
        <slot />
    </div>
</template>
