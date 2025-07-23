<script setup lang="ts">
import { type IconProps, iconPropsDefaults } from '../functions/icon.ts'
import { nextTick, onMounted, ref, useAttrs } from 'vue'
import { assertInject, propsBinder, remapEvents } from '../utils.ts'
import {
    CanSetParentHtmlInjection,
    SetIconInjection,
    SetParentHtmlInjection,
} from '../types/injectionKeys.ts'
import { DivIcon, DomEvent, Icon } from 'leaflet'

const props = withDefaults(defineProps<IconProps>(), iconPropsDefaults)

const {root} = useIcon()
defineExpose({ root })

function useIcon() {
    const root = ref<HTMLElement>()

    const {scheduleCreateIcon, scheduleHtmlSwap} = useCreateIcon()
    const methods = {
        setIconUrl: scheduleCreateIcon,
        setIconRetinaUrl: scheduleCreateIcon,
        setIconSize: scheduleCreateIcon,
        setIconAnchor: scheduleCreateIcon,
        setPopupAnchor: scheduleCreateIcon,
        setTooltipAnchor: scheduleCreateIcon,
        setShadowUrl: scheduleCreateIcon,
        setShadowRetinaUrl: scheduleCreateIcon,
        setShadowAnchor: scheduleCreateIcon,
        setBgPos: scheduleCreateIcon,
        setClassName: scheduleCreateIcon,
        setHtml: scheduleCreateIcon,
    }

    onMounted(async () => {
        propsBinder(methods, {}, props)

        const observer = new MutationObserver(scheduleHtmlSwap)
        observer.observe(root.value!, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true,
        })
        scheduleCreateIcon()
    })
    return {root}
}

function useCreateIcon() {
    const canSetParentHtml = assertInject(CanSetParentHtmlInjection)
    const setParentHtml = assertInject(SetParentHtmlInjection)
    const setIcon = assertInject(SetIconInjection)
    const attrs = useAttrs()

    let iconObject: Icon | DivIcon | undefined = undefined

    const createIcon = (el: HTMLElement, recreationNeeded: boolean, htmlSwapNeeded: boolean) => {
        const elHtml = el && el.innerHTML
        if (!recreationNeeded) {
            if (htmlSwapNeeded && iconObject && canSetParentHtml()) {
                setParentHtml(elHtml)
            }
            return
        }

        const {listeners} = remapEvents(attrs)
        if (iconObject) {
            DomEvent.off(iconObject, listeners)
        }
        const options = props.iconOptions || {}
        if (elHtml) {
            options.html = elHtml
        }

        iconObject = options.html ? new DivIcon(options) : new Icon(options)
        DomEvent.on(iconObject, listeners)
        setIcon(iconObject)
    }

    const scheduleCreateIcon = () => {
        nextTick(() => {
            if (root.value) createIcon(root.value, true, false)
        })
    }

    const scheduleHtmlSwap = () => {
        nextTick(() => {
            if (root.value) createIcon(root.value, false, true)
        })
    }
    return {scheduleCreateIcon, scheduleHtmlSwap}
}
</script>

<template>
    <div ref="root">
        <slot />
    </div>
</template>

<style scoped></style>
