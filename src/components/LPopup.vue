<script setup lang="ts">
import { markRaw, nextTick, onBeforeUnmount, onMounted, ref, useAttrs } from 'vue'
import { BindPopupInjection, UnbindPopupInjection } from '../types/injectionKeys'
import { assertInject, propsBinder, remapEvents } from '../utils.js'
import { Popup, Tooltip } from 'leaflet'
import { type PopupProps, popupPropsDefaults, setupPopup } from '../functions/popup.ts'

const props = withDefaults(defineProps<PopupProps>(), popupPropsDefaults)
const emit = defineEmits<{
    (event: 'ready', tooltip: Tooltip): void
}>()

const { root, leafletObject } = usePopup()
defineExpose({ root, leafletObject })

function usePopup() {
    const leafletObject = ref<Popup>()
    const root = ref(null)

    const bindPopup = assertInject(BindPopupInjection)
    const unbindPopup = assertInject(UnbindPopupInjection)

    const { options, methods } = setupPopup(props, leafletObject)

    onMounted(async () => {
        leafletObject.value = markRaw<Popup>(new Popup(options))

        if (props.latLng !== undefined) {
            leafletObject.value.setLatLng(props.latLng)
        }

        propsBinder(methods, leafletObject.value, props)
        const { listeners } = remapEvents(useAttrs())
        leafletObject.value.on(listeners)
        leafletObject.value.setContent(props.content || root.value || '')
        bindPopup(leafletObject.value)
        nextTick(() => emit('ready', leafletObject.value!))
    })

    onBeforeUnmount(() => {
        unbindPopup()
    })

    return { root, leafletObject }
}
</script>

<template>
    <div ref="root">
        <slot />
    </div>
</template>
