<script setup lang="ts">
import { Tooltip } from 'leaflet'
import { markRaw, nextTick, onMounted, ref, useAttrs } from 'vue'
import { setupTooltip } from '../functions/tooltip'
import { BindTooltipInjection } from '../types/injectionKeys'
import { assertInject, propsBinder, remapEvents } from '../utils.js'
import { type TooltipProps, tooltipPropsDefaults } from '../functions/tooltip.ts'

const props = withDefaults(defineProps<TooltipProps>(), tooltipPropsDefaults)

const leafletObject = ref<Tooltip>()
const root = ref(null)

const bindTooltip = assertInject(BindTooltipInjection)

const { options, methods } = setupTooltip(props, leafletObject)

const emit = defineEmits<{
    (event: 'ready', tooltip: Tooltip): void
}>()

onMounted(async () => {
    leafletObject.value = markRaw<Tooltip>(new Tooltip(options))

    propsBinder(methods, leafletObject.value, props)
    const { listeners } = remapEvents(useAttrs())
    leafletObject.value.on(listeners)
    leafletObject.value.setContent(props.content || root.value || '')
    bindTooltip(leafletObject.value)
    nextTick(() => emit('ready', leafletObject.value!))
})

defineExpose({ root, leafletObject })
</script>

<template>
    <div ref="root">
        <slot />
    </div>
</template>
