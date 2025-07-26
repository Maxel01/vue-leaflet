<script setup lang="ts">
import { Control } from 'leaflet'
import { markRaw, nextTick, onMounted, ref } from 'vue'

import {
    type ControlAttributionEmits,
    type ControlAttributionProps,
    controlAttributionPropsDefaults,
    setupControlAttribution,
} from '../functions/controlAttribution'
import { RegisterControlInjection } from '../types/injectionKeys'
import { assertInject, propsBinder } from '../utils.js'

const props = withDefaults(defineProps<ControlAttributionProps>(), controlAttributionPropsDefaults)
const emit = defineEmits<ControlAttributionEmits>()

const { leafletObject } = useControlAttribution()
defineExpose({ leafletObject })

function useControlAttribution() {
    const leafletObject = ref<Control.Attribution>()

    const registerControl = assertInject(RegisterControlInjection)

    const { options, methods } = setupControlAttribution(props, leafletObject)

    onMounted(async () => {
        leafletObject.value = markRaw<Control.Attribution>(new Control.Attribution(options))
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
