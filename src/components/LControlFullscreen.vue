<script setup lang="ts">
import { markRaw, nextTick, onMounted, ref } from 'vue'

import { RegisterControlInjection } from '@/types/injectionKeys'
import { assertInject, propsBinder } from '@/utils'
import {
    type ControlFullscreenEmits,
    type ControlFullscreenProps,
    controlFullscreenPropsDefaults,
    setupControlFullscreen
} from '@/functions/controlFullscreen'
import { FullscreenControl } from 'leaflet'

/**
 * > A control that toggles fullscreen mode for the map.
 * @demo control-fullscreen {12}
 */
defineOptions({ name: 'LControlFullscreen' })
const props = withDefaults(defineProps<ControlFullscreenProps>(), controlFullscreenPropsDefaults)
const emit = defineEmits<ControlFullscreenEmits>()

const { leafletObject } = useControlFullscreen()
defineExpose({
    /**
     * The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state).
     * @type {Ref<FullscreenControl \| undefined>}
     */
    leafletObject
})

function useControlFullscreen() {
    const leafletObject = ref<FullscreenControl>()

    const registerControl = assertInject(RegisterControlInjection)

    const { options, methods } = setupControlFullscreen(props, leafletObject)

    onMounted(async () => {
        leafletObject.value = markRaw<FullscreenControl>(new FullscreenControl(options))
        propsBinder(methods, leafletObject.value, props)
        registerControl({ leafletObject: leafletObject.value })
        nextTick(() => emit('ready', leafletObject.value!))
    })

    return { leafletObject }
}
</script>

<!-- eslint-disable-next-line vue/valid-template-root -->
<template></template>
