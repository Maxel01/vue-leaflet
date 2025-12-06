<script setup lang="ts">
import { Control } from 'leaflet'
import { markRaw, nextTick, onMounted, ref } from 'vue'

import { RegisterControlInjection } from '@/types/injectionKeys'
import { assertInject, propsBinder } from '@/utils'
import {
    type ControlScaleEmits,
    type ControlScaleProps,
    controlScalePropsDefaults,
    setupControlScale
} from '@/functions/controlScale'

/**
 * > A simple scale control that shows the scale of the current center of screen in metric (m/km) and imperial (mi/ft) systems.
 * @demo control-scale {12}
 */
defineOptions({ name: 'LControlScale' })
const props = withDefaults(defineProps<ControlScaleProps>(), controlScalePropsDefaults)
const emit = defineEmits<ControlScaleEmits>()

const { leafletObject } = useControlScale()
defineExpose({
    /**
     * The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state).
     * @type {Ref<Control.Scale \| undefined>}
     */
    leafletObject
})

function useControlScale() {
    const leafletObject = ref<Control.Scale>()

    const registerControl = assertInject(RegisterControlInjection)

    const { options, methods } = setupControlScale(props, leafletObject)

    onMounted(async () => {
        leafletObject.value = markRaw<Control.Scale>(new Control.Scale(options))
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
