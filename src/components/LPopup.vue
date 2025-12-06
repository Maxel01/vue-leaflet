<script setup lang="ts">
import { markRaw, nextTick, onBeforeUnmount, onMounted, ref, useAttrs } from 'vue'
import { BindPopupInjection, UnbindPopupInjection } from '@/types/injectionKeys'
import { assertInject, propsBinder, remapEvents } from '@/utils'
import { Popup } from 'leaflet'
import { type PopupProps, popupPropsDefaults, setupPopup } from '@/functions/popup'

/**
 * > Display a popup on the map
 *
 * ::: tip
 * Popup placed inside a marker will by default appear on marker click.
 * :::
 * @demo popup {25,30,46,56,69,77}
 */
defineOptions({ name: 'LPopup' })
const props = withDefaults(defineProps<PopupProps>(), popupPropsDefaults)
const emit = defineEmits<{
    /**
     * Triggers when the component is ready
     */
    (event: 'ready', popup: Popup): void
}>()

const { root, leafletObject } = usePopup()
defineExpose({
    /**
     * The root DOM element of the Leaflet popup. This element is managed by Leaflet's `Popup` class. You can use it to directly manipulate the popup's container (e.g. styling, event listeners), or alternatively use the default slot for custom content.
     *  @type {Ref<HTMLElement \| undefined>}
     */
    root,
    /**
     * The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state).
     * @type {Ref<Popup \| undefined>}
     */
    leafletObject
})

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
        leafletObject.value.setContent(props.content || root.value!)
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
        <!--
        @slot Content to be rendered inside the Leaflet popup's container. This slot replaces the default content and allows full customization of the popup's appearance. The content will be injected into the popup's root DOM element.
        -->
        <slot />
    </div>
</template>
