<script setup lang="ts">
import { Control, DomEvent } from 'leaflet'
import { markRaw, nextTick, onMounted, ref } from 'vue'

import { type ControlEmits, type ControlProps, controlPropsDefaults, setupControl } from '../functions/control'
import { RegisterControlInjection } from '../types/injectionKeys'
import { assertInject, propsBinder } from '../utils.js'

const props = withDefaults(
    defineProps<
        ControlProps & {
            disableClickPropagation: boolean
            disableScrollPropagation: boolean
        }
    >(),
    { ...controlPropsDefaults, disableClickPropagation: true, disableScrollPropagation: false },
)
const emit = defineEmits<ControlEmits>()

const { root, leafletObject } = useControl()
defineExpose({ root, leafletObject })

function useControl() {
    const leafletObject = ref<L.Control>()
    const root = ref<HTMLInputElement>()

    const registerControl = assertInject(RegisterControlInjection)

    const { options, methods } = setupControl(props, leafletObject)

    onMounted(async () => {
        class LControl extends Control {
            onAdd() {
                return root.value!
            }
        }

        leafletObject.value = markRaw<Control>(new LControl(options))
        propsBinder(methods, leafletObject.value, props)
        registerControl({ leafletObject: leafletObject.value })

        if (props.disableClickPropagation && root.value) {
            DomEvent.disableClickPropagation(root.value)
        }
        if (props.disableScrollPropagation && root.value) {
            DomEvent.disableScrollPropagation(root.value)
        }
        nextTick(() => emit('ready', leafletObject.value!))
    })
    return { root, leafletObject }
}
</script>

<template>
    <div style="display: none">
        <slot />
    </div>
</template>
