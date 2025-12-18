<script setup lang="ts">
import { computed, markRaw, nextTick, onBeforeUnmount, onMounted, ref, useAttrs } from 'vue'
import {
    type Control,
    type CRS,
    type FitBoundsOptions,
    Icon,
    LatLng,
    LatLngBounds,
    type LatLngBoundsExpression,
    type LatLngExpression,
    type LeafletEvent,
    type LeafletEventHandlerFnMap,
    Map,
    type MapOptions,
    Util,
    type ZoomPanOptions
} from 'leaflet'
import { debounce } from 'ts-debounce'
import {
    bindEventHandlers,
    cancelDebounces,
    propsBinder,
    propsToLeafletOptions,
    provideLeafletWrapper,
    remapEvents,
    resetWebpackIcon,
    updateLeafletWrapper
} from '@/utils'
import type {
    IControlDefinition,
    ILayerControlDefinition,
    ILayerDefinition
} from '@/types/interfaces'
import {
    AddLayerInjection,
    GetMapObjectInjection,
    RegisterControlInjection,
    RegisterLayerControlInjection,
    RemoveLayerInjection
} from '@/types/injectionKeys'
import { type MapEmits, type MapProps, mapPropsDefaults, setupMap } from '@/functions/map'

/**
 * > Base component, contains and wraps all the other components.
 * @demo index {5,9-15}
 */
defineOptions({ name: 'LMap' })
const props = withDefaults(defineProps<MapProps>(), mapPropsDefaults)

const { root, leafletObject, ready } = useMap()
const { zoomPanOptions, fitBoundsOptions } = useOptions()
const { methods, layersInControl } = useMethods()
const { listeners, attrs, eventHandlers } = useEvents()
useProvideFunctions()

const emit = defineEmits<MapEmits>()

defineExpose({
    /**
     * The root DOM element of the Leaflet map. This element is used to create the Leaflet's `Map` class. You can use it to directly manipulate the map's container (e.g. styling, event listeners).
     *  @type {Ref<HTMLElement \| undefined>}
     */
    root,
    /**
     * Indicates whether the component and its underlying Leaflet object are fully initialized.
     * @type {Ref<boolean>}
     */
    ready,
    /**
     * The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state).
     * @type {Ref<Map \| undefined>}
     */
    leafletObject,
    attrs,
    ...methods
})

function useMap() {
    const root = ref<HTMLElement>()
    const leafletObject = ref<Map>()
    const ready = ref<boolean>(false)

    const { options: componentOptions } = setupMap(props)

    const options = propsToLeafletOptions<MapOptions>(props, componentOptions)

    onMounted(async () => {
        try {
            // TODO: Is beforeMapMount still needed?
            if (props.beforeMapMount) {
                await props.beforeMapMount()
            }
        } catch (error) {
            console.error(
                `The following error occurred running the provided beforeMapMount hook ${error}`
            )
        }
        await resetWebpackIcon(Icon)

        leafletObject.value = markRaw(new Map(root.value!, options))

        propsBinder(methods, leafletObject.value, props)

        bindEventHandlers(leafletObject.value, eventHandlers)
        bindEventHandlers(leafletObject.value, listeners)

        ready.value = true
        nextTick(() => emit('ready', leafletObject.value!))
    })

    onBeforeUnmount(() => {
        cancelDebounces(eventHandlers)
        leafletObject.value?.off()
        leafletObject.value?.remove()
    })

    return { root, leafletObject, ready }
}

function useOptions() {
    const zoomPanOptions = computed((): ZoomPanOptions => {
        const result: ZoomPanOptions = {}
        if (props.noBlockingAnimations) {
            result.animate = false
        }
        return result
    })

    const fitBoundsOptions = computed((): FitBoundsOptions => {
        const result: FitBoundsOptions = zoomPanOptions.value
        result.padding = props.padding ? props.padding : undefined
        result.paddingTopLeft = props.paddingTopLeft ? props.paddingTopLeft : undefined
        result.paddingBottomRight = props.paddingBottomRight ? props.paddingBottomRight : undefined
        return result
    })
    return { zoomPanOptions, fitBoundsOptions }
}

function useMethods() {
    const layersInControl = ref<ILayerDefinition[]>([])
    const layerControl = ref<ILayerControlDefinition>()
    const layersToAdd = ref<ILayerDefinition[]>([])

    function getMapObject(): Map | undefined {
        return leafletObject.value
    }

    function addLayer(layer: ILayerDefinition) {
        if (layer.layerType !== undefined) {
            if (layerControl.value === undefined) {
                layersToAdd.value.push(layer)
            } else {
                const exist = layersInControl.value.find(
                    (l) => Util.stamp(l.leafletObject) === Util.stamp(layer.leafletObject)
                )
                if (!exist) {
                    layerControl.value.addLayer(layer)
                    layersInControl.value.push(layer)
                }
            }
        }
        if (layer.leafletObject && layer.visible !== false) {
            leafletObject.value!.addLayer(layer.leafletObject)
        }
    }

    function removeLayer(layer: ILayerDefinition) {
        if (layer.layerType !== undefined) {
            if (layerControl.value === undefined) {
                layersToAdd.value = layersToAdd.value.filter((l) => l.name !== layer.name)
            } else {
                layerControl.value.removeLayer(layer)
                layersInControl.value = layersInControl.value.filter(
                    (l) => Util.stamp(l.leafletObject) !== Util.stamp(layer.leafletObject)
                )
            }
        }
        if (layer.leafletObject) leafletObject.value!.removeLayer(layer.leafletObject)
    }

    function registerLayerControl(lControlLayer: ILayerControlDefinition<Control.Layers>) {
        layerControl.value = lControlLayer
        layersToAdd.value.forEach((layer) => {
            // TODO TYPES remove as cast
            layerControl.value!.addLayer(layer as ILayerDefinition)
        })
        layersToAdd.value = []

        registerControl(lControlLayer)
    }

    function registerControl(lControl: IControlDefinition) {
        leafletObject.value!.addControl(lControl.leafletObject)
    }

    function setZoom(zoom: number) {
        const currentZoom = leafletObject.value!.getZoom()
        if (zoom !== currentZoom) {
            leafletObject.value!.setZoom(zoom, zoomPanOptions.value)
        }
    }

    function setCrs(crs: CRS) {
        const prevBounds = leafletObject.value!.getBounds()
        leafletObject.value!.options.crs = crs
        leafletObject.value!.fitBounds(prevBounds, {
            animate: false,
            padding: [0, 0]
        })
    }

    function fitBounds(bounds: LatLngBoundsExpression) {
        leafletObject.value!.fitBounds(bounds, fitBoundsOptions.value)
    }

    const lastSetBounds = ref<LatLngBounds>()
    function setBounds(bounds: LatLngExpression[]) {
        if (!bounds) {
            return
        }
        const newBounds = new LatLngBounds(bounds)
        if (!newBounds.isValid()) {
            return
        }
        const oldBounds = lastSetBounds.value || leafletObject.value!.getBounds()
        const boundsChanged = !oldBounds.equals(newBounds, 0) // set maxMargin to 0 - check exact equals
        if (boundsChanged) {
            lastSetBounds.value = newBounds
            fitBounds(newBounds)
        }
    }

    const lastSetCenter = ref<LatLng>()
    function setCenter(center: [number, number]) {
        if (!center) {
            return
        }
        const newCenter = new LatLng(...center)
        const oldCenter = lastSetCenter.value || leafletObject.value!.getCenter()
        if (oldCenter.lat !== newCenter.lat || oldCenter.lng !== newCenter.lng) {
            lastSetCenter.value = newCenter
            leafletObject.value!.panTo(newCenter, zoomPanOptions.value)
        }
    }

    return {
        methods: {
            getMapObject,
            addLayer,
            removeLayer,
            registerLayerControl,
            registerControl,
            setZoom,
            setCrs,
            fitBounds,
            setBounds,
            setCenter
        },
        layersInControl
    }
}

function useEvents() {
    const { listeners, attrs } = remapEvents(useAttrs())
    const eventHandlers: LeafletEventHandlerFnMap = {
        moveend: debounce((_ev: LeafletEvent) => {
            if (!leafletObject.value) return
            emit('update:zoom', leafletObject.value.getZoom())
            emit('update:center', leafletObject.value.getCenter())
            emit('update:bounds', leafletObject.value.getBounds())
        }),
        overlayadd(ev) {
            const layer = layersInControl.value.find((l) => l.name === ev.name)
            layer?.updateVisibleProp(true)
        },
        overlayremove(ev) {
            const layer = layersInControl.value.find((l) => l.name === ev.name)
            layer?.updateVisibleProp(false)
        }
    }

    return { listeners, attrs, eventHandlers }
}

function useProvideFunctions() {
    const mapObject = provideLeafletWrapper(GetMapObjectInjection)
    const addLayer = provideLeafletWrapper(AddLayerInjection)
    const removeLayer = provideLeafletWrapper(RemoveLayerInjection)
    const registerControl = provideLeafletWrapper(RegisterControlInjection)
    const registerLayerControl = provideLeafletWrapper(RegisterLayerControlInjection)

    onMounted(() => {
        updateLeafletWrapper(mapObject, methods.getMapObject)
        updateLeafletWrapper(addLayer, methods.addLayer)
        updateLeafletWrapper(removeLayer, methods.removeLayer)
        updateLeafletWrapper(registerControl, methods.registerControl)
        updateLeafletWrapper(registerLayerControl, methods.registerLayerControl)
    })
}
</script>

<template>
    <div ref="root" :style="{ width: props.width, height: props.height }">
        <!--
        @slot The default slot is rendered inside the map container and is used to embed layer components, controls, or any custom Vue components. Common usage includes placing `LTileLayer`, `LMarker`, `LPopup`, `LFeatureGroup`, or other Leaflet-related elements that interact with the map.
        -->
        <slot v-if="ready" />
    </div>
</template>

<style scoped></style>
