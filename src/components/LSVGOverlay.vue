<script setup lang="ts">
import { SVGOverlay } from 'leaflet'
import { markRaw, nextTick, onMounted, ref, useAttrs, computed } from 'vue'
import { AddLayerInjection } from '@/types/injectionKeys'
import { assertInject, propsBinder, remapEvents } from '@/utils'
import {
    setupSVGOverlay,
    type SVGOverlayEmits,
    type SVGOverlayProps,
    svgOverlayPropsDefaults
} from '@/functions/svgOverlay'

/**
 * > Used to load and display a single svg over specific bounds of the map.
 * @demo svg-overlay {7-24,40-49}
 */
defineOptions({ name: 'LSVGOverlay' })
const props = withDefaults(defineProps<SVGOverlayProps>(), svgOverlayPropsDefaults)
const emit = defineEmits<SVGOverlayEmits>()

const { ready, leafletObject, svgRoot } = useSVGOverlay()
defineExpose({
    /**
     * Indicates whether the component and its underlying Leaflet object are fully initialized.
     * @type {Ref<boolean>}
     */
    ready,
    /**
     * The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state).
     * @type {Ref<SVGOverlay \| undefined>}
     */
    leafletObject
})

function useSVGOverlay() {
    const leafletObject = ref<SVGOverlay>()
    const ready = ref(false)
    const svgRoot = ref<HTMLDivElement>()
    const svg = computed<SVGElement | undefined>(() => {
        const svg = svgRoot.value?.firstElementChild
        return svg?.tagName === 'svg' ? (svg as SVGElement) : undefined
    })

    const addLayer = assertInject(AddLayerInjection)

    const { options, methods } = setupSVGOverlay(props, leafletObject, emit)

    onMounted(async () => {
        if (!svg.value && !props.svg) {
            console.warn('Missing svg prop or slot: LSVGOverlay has not been created.')
            return
        }
        leafletObject.value = markRaw<SVGOverlay>(
            new SVGOverlay(svg.value ? svg.value : props.svg!, props.bounds, options)
        )

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

    return { ready, leafletObject, svgRoot }
}
</script>

<template>
    <div v-if="ready" style="display: none">
        <!--
       @slot Used to inject Leaflet child components like `<LPopup>` or `<LTooltip>` into the `LSVGOverlay`.
       -->
        <slot />
    </div>
    <div style="display: none" ref="svgRoot">
        <!--
       @slot Place your `SVGElement` inside this slot. Be aware that `props.svg` will be ignored, when this slot is used. Changes inside the `SVGElement` are reactive. However, replacing the `SVGElement` is not reactive.
       -->
        <slot name="svg" />
    </div>
</template>
