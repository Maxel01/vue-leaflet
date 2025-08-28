<script setup lang="ts">
import { markRaw, nextTick, onMounted, ref, useAttrs } from 'vue'
import { AddLayerInjection } from '@maxel01/vue-leaflet'
import { assertInject, propsBinder, remapEvents } from '@maxel01/vue-leaflet'
import {
    type HotlineEmits,
    type HotlineProps,
    hotlinePropsDefaults,
    setupHotline
} from './hotline'
import { Hotline } from './leaflet.hotline'

/**
 * >
 * @demo
 */
defineOptions({})
const props = withDefaults(defineProps<HotlineProps>(), hotlinePropsDefaults)
const emit = defineEmits<HotlineEmits>()

const { ready, leafletObject } = useHotline()
defineExpose({
    /**
     * Indicates whether the component and its underlying Leaflet object are fully initialized.
     * @type {Ref<boolean>}
     */
    ready,
    /**
     * The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state).
     * @type {Ref<Hotline \| undefined>}
     */
    leafletObject
})

function useHotline() {
    const leafletObject = ref<Hotline>()
    const ready = ref(false)

    const addLayer = assertInject(AddLayerInjection)

    const { options, methods } = setupHotline(props, leafletObject, emit)

    onMounted(async () => {
        leafletObject.value = markRaw<Hotline>(new Hotline(props.latLngs, options))

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
    return { leafletObject, ready }
}
</script>

<template>
    <div></div>
</template>
