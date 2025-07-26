import { onUnmounted, provide, type Ref } from 'vue'

import {
    AddLayerInjection,
    BindPopupInjection,
    BindTooltipInjection,
    RemoveLayerInjection,
    UnbindPopupInjection,
    UnbindTooltipInjection,
} from '../types/injectionKeys'
import { assertInject, isFunction, propsToLeafletOptions } from '../utils'

import type { LayerType } from '../types/enums/LayerType'
import { type ComponentProps, componentPropsDefaults, setupComponent } from './component'
import type { Layer, LayerOptions, Popup, Tooltip } from 'leaflet'

export interface LayerProps<T extends LayerOptions = LayerOptions> extends ComponentProps<T> {
    pane?: string
    attribution?: string
    name?: string
    layerType?: LayerType
    visible?: boolean
}

export const layerPropsDefaults = {
    ...componentPropsDefaults,
    visible: true,
}

export type LayerEmits = {
    (event: 'update:visible', value: boolean): void
}

export const setupLayer = <T extends Layer>(
    props: LayerProps,
    leafletRef: Ref<T | undefined>,
    emit: LayerEmits,
) => {
    const addLayer = assertInject(AddLayerInjection)
    const removeLayer = assertInject(RemoveLayerInjection)
    const { options: componentOptions, methods: componentMethods } = setupComponent(props)

    const options = propsToLeafletOptions<LayerOptions>(props, componentOptions)

    const addThisLayer = () => addLayer({ leafletObject: leafletRef.value })
    const removeThisLayer = () => removeLayer({ leafletObject: leafletRef.value })

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
        bindPopup(leafletObject: Popup) {
            if (!leafletRef.value || !isFunction(leafletRef.value.bindPopup)) {
                console.warn('Attempt to bind popup before bindPopup method available on layer.')

                return
            }

            leafletRef.value.bindPopup(leafletObject)
        },
        bindTooltip(leafletObject: Tooltip) {
            if (!leafletRef.value || !isFunction(leafletRef.value.bindTooltip)) {
                console.warn(
                    'Attempt to bind tooltip before bindTooltip method available on layer.',
                )

                return
            }

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
        updateVisibleProp(value: boolean) {
            /**
             * Triggers when the visible prop needs to be updated
             * @type {boolean}
             * @property {boolean} value - value of the visible property
             */
            emit('update:visible', value)
        },
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
