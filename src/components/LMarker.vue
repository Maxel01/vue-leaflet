<script setup lang="ts">
import {
    markRaw,
    nextTick,
    onBeforeUnmount,
    onMounted,
    provide,
    ref,
    useAttrs,
    useSlots,
} from 'vue'
import {
    assertInject,
    bindEventHandlers,
    cancelDebounces,
    isFunction,
    propsBinder,
    remapEvents,
} from '../utils.ts'
import {
    AddLayerInjection,
    CanSetParentHtmlInjection,
    SetIconInjection,
    SetParentHtmlInjection,
} from '../types/injectionKeys.ts'
import { DivIcon, Icon, type LeafletEventHandlerFnMap, Marker } from 'leaflet'
import { debounce } from 'ts-debounce'
import {
    type MarkerEmits,
    type MarkerProps,
    markerPropsDefaults,
    setupMarker,
    shouldBlankIcon,
} from '../functions/marker.ts'

const props = withDefaults(defineProps<MarkerProps>(), markerPropsDefaults)
const emit = defineEmits<MarkerEmits>()

const { listeners, eventHandlers } = useEvents()
const { leafletObject, ready, methods } = useMarker()

useProvideFunctions()
defineExpose({ ready, leafletObject })

function useMarker() {
    const leafletObject = ref<Marker>()
    const ready = ref<boolean>(false)
    const addLayer = assertInject(AddLayerInjection)
    const { methods } = setupMarker(props, leafletObject, emit)

    onMounted(async () => {
        const layerOptions = props.layerOptions || {}
        if (shouldBlankIcon(useSlots())) {
            layerOptions.icon = new DivIcon({ className: '' })
        }
        leafletObject.value = markRaw<Marker>(new Marker(props.latLng, layerOptions))

        bindEventHandlers(leafletObject.value, listeners)
        bindEventHandlers(leafletObject.value, eventHandlers)
        propsBinder(methods, leafletObject.value, props)
        addLayer({
            ...props,
            ...methods,
            leafletObject: leafletObject.value,
        })
        ready.value = true
        nextTick(() => emit('ready', leafletObject.value!))
    })

    onBeforeUnmount(() => cancelDebounces(eventHandlers))
    return { leafletObject, ready, methods }
}

function useEvents() {
    const { listeners } = remapEvents(useAttrs())
    const eventHandlers: LeafletEventHandlerFnMap = {
        move: debounce(methods.latLngSync),
    }
    return { listeners, eventHandlers }
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
        <slot />
    </div>
</template>

<style scoped></style>
