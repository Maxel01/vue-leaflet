<script setup lang="ts">
import { markRaw, nextTick, onMounted, ref } from 'vue'
import { Control } from 'leaflet'
import { RegisterLayerControlInjection } from '@/types/injectionKeys'
import {
    type ControlLayersEmits,
    type ControlLayersProps,
    controlLayersPropsDefaults,
    setupControlLayers
} from '@/functions/controlLayers'
import { assertInject, propsBinder } from '@/utils'
/**
 * > The layers control gives users the ability to switch between different base layers and switch overlays on/off.
 * @demo control-layers {18}
 */
defineOptions({ name: 'LControlLayers' })
const props = withDefaults(defineProps<ControlLayersProps>(), controlLayersPropsDefaults)
const emit = defineEmits<ControlLayersEmits>()

const { leafletObject } = useControlLayers()
defineExpose({
    /**
     * The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state).
     * @type {Ref<Control.Layers \| undefined>}
     */
    leafletObject
})

function useControlLayers() {
    const leafletObject = ref<Control.Layers>()

    const registerLayerControl = assertInject(RegisterLayerControlInjection)

    const { options, methods } = setupControlLayers(props, leafletObject)

    onMounted(async () => {
        leafletObject.value = markRaw<Control.Layers>(
            new Control.Layers(undefined, undefined, options)
        )

        propsBinder(methods, leafletObject.value, props)

        registerLayerControl({
            ...props,
            ...methods,
            leafletObject: leafletObject.value
        })
        nextTick(() => emit('ready', leafletObject.value!))
    })

    return { leafletObject }
}
</script>

<template>
    <div style="display: none"></div>
</template>
