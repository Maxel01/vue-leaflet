<script setup lang="ts">
import {
    CreateVueGridLayer,
    type GridLayerEmits,
    type GridLayerProps,
    gridLayerPropsDefaults,
    setupGridLayer
} from '../functions/gridLayer.ts'
import { markRaw, nextTick, onMounted, ref, useAttrs } from 'vue'
import { AddLayerInjection } from '../types/injectionKeys.ts'
import { assertInject, propsBinder, remapEvents } from '../utils.ts'
import { GridLayer } from 'leaflet'

const props = withDefaults(defineProps<GridLayerProps>(), gridLayerPropsDefaults)

const emit = defineEmits<GridLayerEmits>()
const {leafletObject, root, ready} = useGridLayer()

defineExpose({
    /**
     * The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state).
     * @type {Ref<GridLayer \| undefined>}
     */
    leafletObject,
    /**
     * The root DOM element. ?
     * @type {Ref<HTMLElement \| undefined>}
     */
    root,
    /**
     * Indicates whether the component and its underlying Leaflet object are fully initialized.
     * @type {Ref<boolean>}
     */
    ready
})

function useGridLayer() {
    const leafletObject = ref<GridLayer>()
    const root = ref<HTMLElement>()
    const ready = ref<boolean>(false)

    const addLayer = assertInject(AddLayerInjection)
    const { options, methods } = setupGridLayer(props, leafletObject, emit)

    onMounted(async () => {
        const GLayer = CreateVueGridLayer(props.childRender)
        leafletObject.value = markRaw<GridLayer>(new GLayer(options))

        const { listeners } = remapEvents(useAttrs())
        leafletObject.value!.on(listeners)

        propsBinder(methods, leafletObject.value, props)
        addLayer({
            ...props,
            ...methods,
            leafletObject: leafletObject.value,
        })
        ready.value = true
        nextTick(() => emit('ready', leafletObject.value!))
    })
    return {leafletObject, root, ready}
}
</script>

<template>
    <div v-if="ready" ref="root" style="display: none"></div>
</template>

<style scoped></style>
