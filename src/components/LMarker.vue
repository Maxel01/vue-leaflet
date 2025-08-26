<script setup lang="ts">
import {
    markRaw,
    nextTick,
    onBeforeUnmount,
    onMounted,
    provide,
    ref,
    useAttrs,
    useSlots
} from 'vue'
import {
    assertInject,
    bindEventHandlers,
    cancelDebounces,
    isFunction,
    propsBinder,
    remapEvents
} from '@/utils'
import {
    AddLayerInjection,
    CanSetParentHtmlInjection,
    SetIconInjection,
    SetParentHtmlInjection
} from '@/types/injectionKeys'
import { DivIcon, Icon, type LeafletEventHandlerFnMap, Marker } from 'leaflet'
import { debounce } from 'ts-debounce'
import {
    type MarkerEmits,
    type MarkerProps,
    markerPropsDefaults,
    setupMarker,
    shouldBlankIcon
} from '@/functions/marker'

/**
 * > Used to display clickable/draggable markers on the map.
 * @demo marker {5,15}
 */
defineOptions({})
const props = withDefaults(defineProps<MarkerProps>(), markerPropsDefaults)
const emit = defineEmits<MarkerEmits>()

const { leafletObject, ready } = useMarker()

useProvideFunctions()
defineExpose({
    /**
     * Indicates whether the component and its underlying Leaflet object are fully initialized.
     * @type {Ref<boolean>}
     */
    ready,
    /**
     * The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state).
     * @type {Ref<Marker \| undefined>}
     */
    leafletObject
})

function useMarker() {
    const leafletObject = ref<Marker>()
    const ready = ref<boolean>(false)
    const addLayer = assertInject(AddLayerInjection)
    const { options, methods } = setupMarker(props, leafletObject, emit)
    const { listeners, eventHandlers } = useEvents()

    function useEvents() {
        const { listeners } = remapEvents(useAttrs())
        const eventHandlers: LeafletEventHandlerFnMap = {
            move: debounce(methods.latLngSync)
        }
        return { listeners, eventHandlers }
    }

    onMounted(async () => {
        // TODO this causes in vitest: [Vue warn]: Slot "default" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.
        if (shouldBlankIcon(useSlots())) {
            options.icon = new DivIcon({ className: '' })
        }
        leafletObject.value = markRaw<Marker>(new Marker(props.latLng, options))

        bindEventHandlers(leafletObject.value, listeners)
        bindEventHandlers(leafletObject.value, eventHandlers)
        propsBinder(methods, leafletObject.value, props)
        addLayer({
            ...props,
            ...methods,
            leafletObject: leafletObject.value
        })
        ready.value = true
        nextTick(() => emit('ready', leafletObject.value!))
    })

    onBeforeUnmount(() => cancelDebounces(eventHandlers))
    return { leafletObject, ready }
}

function useProvideFunctions() {
    provide(CanSetParentHtmlInjection, () => !!leafletObject.value?.getElement())
    provide(SetParentHtmlInjection, (html: string) => {
        const el = isFunction(leafletObject.value?.getElement) && leafletObject.value?.getElement()
        if (!el) return
        el.innerHTML = html
    })
    provide(SetIconInjection, (newIcon: Icon | DivIcon | undefined) => {
        if (newIcon && leafletObject.value?.setIcon) return leafletObject.value.setIcon(newIcon)
    })
}
</script>

<template>
    <div v-if="ready" style="display: none">
        <!--
        @slot Used to inject Leaflet child components like `<LPopup>` or `<LTooltip>` into the `LMarker`.
        -->
        <slot />
    </div>
</template>

<style scoped></style>
