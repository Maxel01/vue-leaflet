<script setup lang="ts">
import { Control, DomEvent } from 'leaflet'
import { markRaw, nextTick, onMounted, ref } from 'vue'

import {
    type ControlEmits,
    type ControlProps,
    controlPropsDefaults,
    setupControl
} from '@/functions/control'
import { RegisterControlInjection } from '@/types/injectionKeys'
import { assertInject, propsBinder } from '@/utils'

/**
 * > Base component for implementing map controls. Handles positioning. All other controls extend from this component.
 * @demo ControlDemo {4-6,17-23}
 */
defineOptions({})
const props = withDefaults(defineProps<ControlProps>(), controlPropsDefaults)
const emit = defineEmits<ControlEmits>()

const { root, leafletObject } = useControl()
defineExpose({
    /**
     * The root DOM element of the Leaflet control. This element is managed by Leaflet's `Control` class. You can use it to directly manipulate the control's container (e.g. styling, event listeners), or alternatively use the default slot for custom content.
     *  @type {Ref<HTMLElement \| undefined>}
     */
    root,
    /**
     * The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state).
     * @type {Ref<Control \| undefined>}
     */
    leafletObject
})

function useControl() {
    const leafletObject = ref<Control>()
    const root = ref<HTMLElement>()

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
    <div ref="root">
        <!--
        @slot Content to be rendered inside the Leaflet control's container. This slot replaces the default content and allows full customization of the control's appearance. The content will be injected into the control's root DOM element.
        -->
        <slot />
    </div>
</template>
