import { onUnmounted, provide, type Ref } from 'vue'

import {
    AddLayerInjection,
    BindPopupInjection,
    BindTooltipInjection,
    RemoveLayerInjection,
    UnbindPopupInjection,
    UnbindTooltipInjection
} from '@/types/injectionKeys'
import { assertInject, isFunction, propsToLeafletOptions } from '@/utils'

import type { LayerType } from '@/types/enums/LayerType'
import { type ComponentProps, componentPropsDefaults, setupComponent } from '@/functions/component'
import type { Layer, LayerOptions, Popup, Tooltip } from 'leaflet'

export interface LayerProps<T extends LayerOptions = LayerOptions> extends ComponentProps<T> {
    /**
     * By default, the layer will be added to the map's [overlay pane](https://leafletjs.com/reference-2.0.0.html#map-overlaypane). Overriding this option will cause the layer to be placed on another pane by default. Not effective if the renderer option is set (the renderer option will override the pane option).
     * @initOnly
     */
    pane?: string
    /**
     * String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers.
     * @reactive
     */
    attribution?: string
    /**
     *
     * @reactive
     */
    name?: string
    /**
     *
     * @reactive
     */
    layerType?: LayerType
    /**
     *
     * @reactive
     */
    visible?: boolean
}

export const layerPropsDefaults = {
    ...componentPropsDefaults,
    visible: true
}

export interface LayerEmits {
    /**
     * Triggers when the visible prop needs to be updated
     */
    (event: 'update:visible', value: boolean): void
}

export const setupLayer = <T extends Layer>(
    props: LayerProps,
    leafletRef: Ref<T | undefined>,
    emit: LayerEmits
) => {
    const addLayer = assertInject(AddLayerInjection)
    const removeLayer = assertInject(RemoveLayerInjection)
    const { options: componentOptions, methods: componentMethods } = setupComponent(props)

    const options = propsToLeafletOptions<LayerOptions>(props, componentOptions)

    function updateVisibleProp(value: boolean) {
        emit('update:visible', value)
    }
    const addThisLayer = () =>
        addLayer({ leafletObject: leafletRef.value, updateVisibleProp, layerType: props.layerType })
    const removeThisLayer = () =>
        removeLayer({
            leafletObject: leafletRef.value,
            updateVisibleProp,
            layerType: props.layerType
        })

    const methods = {
        ...componentMethods,
        setAttribution(val: string | undefined) {
            removeThisLayer()
            if (leafletRef.value) leafletRef.value.options.attribution = val
            if (props.visible) {
                addThisLayer()
            }
        },
        setName() {
            removeThisLayer()
            if (props.visible) {
                addThisLayer()
            }
        },
        setLayerType() {
            removeThisLayer()
            if (props.visible) {
                addThisLayer()
            }
        },
        setVisible(isVisible: boolean) {
            if (leafletRef.value) {
                if (isVisible) {
                    addThisLayer()
                } else {
                    removeThisLayer()
                }
            }
        },
        bindPopup(leafletObject: Popup | undefined) {
            if (!leafletRef.value || !isFunction(leafletRef.value.bindPopup)) {
                console.warn('Attempt to bind popup before bindPopup method available on layer.')
                return
            }
            if (!leafletObject) return
            leafletRef.value.bindPopup(leafletObject)
        },
        bindTooltip(leafletObject: Tooltip | undefined) {
            if (!leafletRef.value || !isFunction(leafletRef.value.bindTooltip)) {
                console.warn(
                    'Attempt to bind tooltip before bindTooltip method available on layer.'
                )
                return
            }
            if (!leafletObject) return
            leafletRef.value.bindTooltip(leafletObject)
        },
        unbindTooltip() {
            if (leafletRef.value) {
                if (isFunction(leafletRef.value.closeTooltip)) {
                    leafletRef.value.closeTooltip()
                }
                if (isFunction(leafletRef.value.unbindTooltip)) {
                    leafletRef.value.unbindTooltip()
                }
            }
        },
        unbindPopup() {
            if (leafletRef.value) {
                if (isFunction(leafletRef.value.closePopup)) {
                    leafletRef.value.closePopup()
                }
                if (isFunction(leafletRef.value.unbindPopup)) {
                    leafletRef.value.unbindPopup()
                }
            }
        },
        updateVisibleProp
    }

    provide(BindPopupInjection, methods.bindPopup)
    provide(BindTooltipInjection, methods.bindTooltip)
    provide(UnbindPopupInjection, methods.unbindPopup)
    provide(UnbindTooltipInjection, methods.unbindTooltip)

    onUnmounted(() => {
        methods.unbindPopup()
        methods.unbindTooltip()
        removeThisLayer()
    })

    return { options, methods }
}
