<script setup lang="ts">
import { markRaw, nextTick, onMounted, ref } from 'vue'

import { RegisterControlInjection } from '@/types/injectionKeys'
import { assertInject, propsBinder } from '@/utils'
import {
    type ControlZoomEmits,
    type ControlZoomProps,
    controlZoomPropsDefaults,
    setupControlZoom
} from '@/functions/controlZoom'
import { Control } from 'leaflet'

/**
 * > A basic zoom control with two buttons (zoom in and zoom out).
 * @demo control-zoom {12}
 */
defineOptions({ name: 'LControlZoom' })
const props = withDefaults(defineProps<ControlZoomProps>(), controlZoomPropsDefaults)
const emit = defineEmits<ControlZoomEmits>()

const { leafletObject } = useControlZoom()
defineExpose({
    /**
     * The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state).
     * @type {Ref<Control.Zoom \| undefined>}
     */
    leafletObject
})

function useControlZoom() {
    const leafletObject = ref<Control.Scale>()

    const registerControl = assertInject(RegisterControlInjection)

    const { options, methods } = setupControlZoom(props, leafletObject)

    onMounted(async () => {
        leafletObject.value = markRaw<Control.Scale>(new Control.Zoom(options))
        propsBinder(methods, leafletObject.value, props)
        registerControl({ leafletObject: leafletObject.value })
        nextTick(() => emit('ready', leafletObject.value!))
    })

    return { leafletObject }
}
</script>

<!-- eslint-disable-next-line vue/valid-template-root -->
<template></template>
