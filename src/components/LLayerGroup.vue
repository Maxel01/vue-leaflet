<script setup lang="ts">
import { LayerGroup } from 'leaflet'
import { markRaw, nextTick, onMounted, ref, useAttrs } from 'vue'
import { AddLayerInjection } from '../types/injectionKeys'
import { assertInject, propsBinder, remapEvents } from '../utils'
import {
    type LayerGroupEmits,
    type LayerGroupProps,
    layerGroupPropsDefaults,
    setupLayerGroup
} from '../functions/layerGroup'

/**
 * > Use to group several layers and handle them as one. If you add it to the map, any layers added or removed from the group will be added/removed on the map as well.
 *
 * ::: warning
 * This still needs better documentation and examples.
 * :::
 * @demo LayerGroupDemo {13-16}
 */
defineOptions({})
const props = withDefaults(defineProps<LayerGroupProps>(), layerGroupPropsDefaults)
const emit = defineEmits<LayerGroupEmits>()

const { ready, leafletObject } = useLayerGroup()
defineExpose({
    /**
     * Indicates whether the component and its underlying Leaflet object are fully initialized.
     * @type {Ref<boolean>}
     */
    ready,
    /**
     * The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state).
     * @type {Ref<LayerGroup \| undefined>}
     */
    leafletObject
})

function useLayerGroup() {
    const leafletObject = ref<LayerGroup>()
    const ready = ref(false)

    const addLayer = assertInject(AddLayerInjection)

    const { methods } = setupLayerGroup(props, leafletObject, emit)

    onMounted(async () => {
        leafletObject.value = markRaw<LayerGroup>(new LayerGroup(undefined, props.options))

        const { listeners } = remapEvents(useAttrs())
        leafletObject.value.on(listeners)

        propsBinder(methods, leafletObject.value, props)
        addLayer({
            ...props,
            ...methods,
            leafletObject: leafletObject.value
        })
        ready.value = true
        nextTick(() => emit('ready', leafletObject.value!))
    })
    return { ready, leafletObject }
}
</script>

<template>
    <div v-if="ready" style="display: none">
        <!--
        @slot ?
        -->
        <slot />
    </div>
</template>
