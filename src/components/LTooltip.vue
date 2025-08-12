<script setup lang="ts">
import { Tooltip } from 'leaflet'
import { markRaw, nextTick, onMounted, ref, useAttrs } from 'vue'
import { setupTooltip } from '../functions/tooltip'
import { BindTooltipInjection } from '../types/injectionKeys'
import { assertInject, propsBinder, remapEvents } from '../utils.js'
import { type TooltipProps, tooltipPropsDefaults } from '../functions/tooltip.ts'

/**
 * > Display a tooltip on the map
 *
 * ::: tip
 * Tooltip placed inside a marker will by default appear on marker hover.
 * :::
 * @demo TooltipDemo {25,29,34,41,56,66,79,87}
 */
defineOptions({})
const props = withDefaults(defineProps<TooltipProps>(), tooltipPropsDefaults)
const emit = defineEmits<{
    /**
     * Triggers when the component is ready
     */
    (event: 'ready', tooltip: Tooltip): void
}>()
const { root, leafletObject } = useTooltip()
defineExpose({
    /**
     * The root DOM element of the Leaflet tooltip. This element is managed by Leaflet's `Tooltip` class. You can use it to directly manipulate the tooltip's container (e.g. styling, event listeners), or alternatively use the default slot for custom content.
     *  @type {Ref<HTMLElement \| undefined>}
     */
    root,
    /**
     * The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state).
     * @type {Ref<Tooltip \| undefined>}
     */
    leafletObject
})

function useTooltip() {
    const leafletObject = ref<Tooltip>()
    const root = ref<HTMLElement>()

    const bindTooltip = assertInject(BindTooltipInjection)

    const { options, methods } = setupTooltip(props, leafletObject)

    onMounted(async () => {
        leafletObject.value = markRaw<Tooltip>(new Tooltip(options))

        propsBinder(methods, leafletObject.value, props)
        const { listeners } = remapEvents(useAttrs())
        leafletObject.value.on(listeners)
        leafletObject.value.setContent(props.content || root.value || '')
        bindTooltip(leafletObject.value)
        nextTick(() => emit('ready', leafletObject.value!))
    })
    return { root, leafletObject }
}
</script>

<template>
    <div ref="root">
        <!--
        @slot Content to be rendered inside the Leaflet tooltip's container. This slot replaces the default content and allows full customization of the tooltip's appearance. The content will be injected into the tooltip's root DOM element.
        -->
        <slot />
    </div>
</template>
