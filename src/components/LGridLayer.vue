<script setup lang="ts">
import {
    CreateVueGridLayer,
    type GridLayerEmits,
    type GridLayerProps,
    gridLayerPropsDefaults,
    setupGridLayer
} from '@/functions/gridLayer'
import { AddLayerInjection } from '@/types/injectionKeys'
import { assertInject, propsBinder, remapEvents } from '@/utils'
import type { GridLayer } from 'leaflet'
import { markRaw, nextTick, onMounted, ref, useAttrs } from 'vue'

/**
 * > Creates a map layer where each tile is an instantiated Vue component.
 * > Each tile component is given `coords` props by `LGridLayer` to indicate
 * > the zoom level and position of the tile
 * > (see https://leafletjs.com/examples/extending/extending-2-layers.html#lgridlayer-and-dom-elements).
 *
 * ::: warning
 *
 * From [Vue Leaflet legacy v1](https://github.com/vue-leaflet/vue-leaflet/blob/master/src/playground/views/GridLayerDemo.vue) :
 *
 * TODO NEXT: While sorting out type errors in LGridLayer.vue, I realized I'm not sure
 * how or even if its infrastructure is particularly used well. In Vue2Leaflet,
 * you could pass an arbitrary Vue component to the LGridLayer, to be rendered
 * for each tile with its coords passed as props. But that doesn't seem set up here.
 * Should we replicate V2L exactly here? Set things up so that the LGridLayer's $slot
 * can be where/how the component is setup/configured/passed/added? Simply stick with
 * the `childRender` prop and simplify some of the logic in LGridLayer.vue?
 * :::
 * @demo grid-layer {5-11,17}
 */
defineOptions({ name: 'LGridLayer' })
const props = withDefaults(defineProps<GridLayerProps>(), gridLayerPropsDefaults)

const emit = defineEmits<GridLayerEmits>()
const { leafletObject, root, ready } = useGridLayer()

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
            leafletObject: leafletObject.value
        })
        ready.value = true
        nextTick(() => emit('ready', leafletObject.value!))
    })
    return { leafletObject, root, ready }
}
</script>

<template>
    <div v-if="ready" ref="root" style="display: none"></div>
</template>

<style scoped></style>
