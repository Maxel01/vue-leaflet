<script setup lang="ts">
import { Control } from 'leaflet'
import { markRaw, nextTick, onMounted, ref } from 'vue'

import {
    type ControlAttributionEmits,
    type ControlAttributionProps,
    controlAttributionPropsDefaults,
    setupControlAttribution
} from '@/functions/controlAttribution'
import { RegisterControlInjection } from '@/types/injectionKeys'
import { assertInject, propsBinder } from '@/utils'

/**
 * > The attribution control allows you to display attribution data in a small text bos on a map.
 * @demo control-attribution {5,15}
 */
defineOptions({ name: 'LControlAttribution' })
const props = withDefaults(defineProps<ControlAttributionProps>(), controlAttributionPropsDefaults)
const emit = defineEmits<ControlAttributionEmits>()

const { leafletObject } = useControlAttribution()
defineExpose({
    /**
     * The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state).
     * @type {Ref<Control.Attribution \| undefined>}
     */
    leafletObject
})

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

<!-- eslint-disable-next-line vue/valid-template-root -->
<template></template>
