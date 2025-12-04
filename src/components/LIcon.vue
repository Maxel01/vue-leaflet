<script setup lang="ts">
import { setupComponent } from '@/functions/component'
import { type IconProps, iconPropsDefaults } from '@/functions/icon'
import {
    CanSetParentHtmlInjection,
    SetIconInjection,
    SetParentHtmlInjection
} from '@/types/injectionKeys'
import { assertInject, propsBinder, propsToLeafletOptions, remapEvents } from '@/utils'
import { DivIcon, type DivIconOptions, DomEvent, Icon } from 'leaflet'
import { nextTick, onMounted, ref, useAttrs } from 'vue'

/**
 * > Easy and reactive way to configure the icon of a marker
 * @demo icon {6-21,34,39,44,49}
 */
defineOptions({ name: 'LIcon' })
const props = withDefaults(defineProps<IconProps>(), iconPropsDefaults)

const { root } = useIcon()
defineExpose({
    /**
     * The root DOM element.
     * @type {Ref<HTMLElement \| undefined>}
     */
    root
})

function useIcon() {
    const root = ref<HTMLElement>()

    const { scheduleCreateIcon, scheduleHtmlSwap } = useCreateIcon()
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
        setHtml: scheduleCreateIcon
    }

    onMounted(async () => {
        propsBinder(methods, {}, props)

        const observer = new MutationObserver(scheduleHtmlSwap)
        observer.observe(root.value!, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
        })
        scheduleCreateIcon()
    })
    return { root }
}

function useCreateIcon() {
    const canSetParentHtml = assertInject(CanSetParentHtmlInjection)
    const setParentHtml = assertInject(SetParentHtmlInjection)
    const setIcon = assertInject(SetIconInjection)
    const attrs = useAttrs()

    let iconObject: Icon | DivIcon | undefined = undefined

    const createIcon = (el: HTMLElement, recreationNeeded: boolean, htmlSwapNeeded: boolean) => {
        const elHtml = el && el.innerHTML.replace(new RegExp('<!--[\\s\\S]*?-->', 'g'), '')
        if (!recreationNeeded) {
            if (htmlSwapNeeded && iconObject && canSetParentHtml()) {
                setParentHtml(elHtml)
            }
            return
        }

        const { listeners } = remapEvents(attrs)
        if (iconObject) {
            DomEvent.off(iconObject, listeners)
        }

        const { options: componentOptions } = setupComponent(props)
        const options = propsToLeafletOptions<DivIconOptions>(props, componentOptions)
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
    return { scheduleCreateIcon, scheduleHtmlSwap }
}
</script>

<template>
    <div ref="root">
        <!--
        @slot Slot content will be rendered inside the Leaflet icon container. Use this slot to inject custom HTML or Vue components into the icon, such as labels, SVGs, or interactive elements. This will use `DivIcon` instead of `Icon`.
        -->
        <slot />
    </div>
</template>

<style scoped></style>
