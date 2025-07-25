<script setup lang="ts">
import { Control } from 'leaflet'
import { markRaw, nextTick, onMounted, ref } from 'vue'

import { RegisterControlInjection } from '../types/injectionKeys'
import { assertInject, propsBinder } from '../utils.js'
import {
    type ControlScaleEmits,
    type ControlScaleProps,
    controlScalePropsDefaults,
    setupControlScale
} from '../functions/controlScale.ts'

const props = withDefaults(defineProps<ControlScaleProps>(), controlScalePropsDefaults)
const emit = defineEmits<ControlScaleEmits>()

const { leafletObject } = useControlScale()
defineExpose({ leafletObject })

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
