<script setup lang="ts">
import { markRaw, nextTick, onMounted, ref } from 'vue'

import { RegisterControlInjection } from '../types/injectionKeys'
import { assertInject, propsBinder } from '../utils.js'
import {
    type ControlZoomEmits,
    type ControlZoomProps,
    controlZoomPropsDefaults,
    setupControlZoom,
} from '../functions/controlZoom.ts'
import { Control } from 'leaflet'

const props = withDefaults(defineProps<ControlZoomProps>(), controlZoomPropsDefaults)
const emit = defineEmits<ControlZoomEmits>()

const { leafletObject } = useControlZoom()
defineExpose({ leafletObject })

function useControlZoom() {
    const leafletObject = ref<Control.Scale>()

    const registerControl = assertInject(RegisterControlInjection)

    const { options, methods } = setupControlZoom(props, leafletObject)

    onMounted(async () => {
        leafletObject.value = markRaw<L.Control.Scale>(new Control.Zoom(options))
        propsBinder(methods, leafletObject.value, props)
        registerControl({ leafletObject: leafletObject.value })
        nextTick(() => emit('ready', leafletObject.value!))
    })

    return { leafletObject }
}
</script>

<template>
    <div style="display: none"></div>
</template>
