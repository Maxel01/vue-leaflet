<script setup lang="ts">
import {
    computed,
    markRaw,
    nextTick,
    onBeforeUnmount,
    onMounted,
    reactive,
    ref,
    useAttrs
} from 'vue'
import {
    Control,
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
import type { IControlDefinition, ILayerDefinition } from '@/types/interfaces'
import {
    AddLayerInjection,
    RegisterControlInjection,
    RegisterLayerControlInjection,
    RemoveLayerInjection
} from '@/types/injectionKeys'
import type { IMapBlueprint } from '@/types/interfaces/IMapBlueprint'
import { type MapProps, mapPropsDefaults, setupMap } from '@/functions/map'

/**
 * > Base component, contains and wraps all the other components.
 * @demo index {5,9-15}
 */
defineOptions({})
const props = withDefaults(defineProps<MapProps>(), mapPropsDefaults)

const { root, blueprint, leafletObject, ready } = useMap()
const { zoomPanOptions, fitBoundsOptions } = useOptions()
const methods = useMethods()
const { listeners, attrs, eventHandlers } = useEvents()
useProvideFunctions()

const emit = defineEmits<{
    /**
     * Triggers when the component is ready
     */
    (event: 'ready', map: Map): void
    /**
     * Triggers when the map's zoom level changes.
     */
    (event: 'update:zoom', zoom: number): void
    /**
     * Triggers when the map's center coordinates are updated.
     */
    (event: 'update:center', center: LatLng): void
    /**
     * Triggers when the map's visible bounds are updated.
     */
    (event: 'update:bounds', center: LatLngBounds): void
}>()

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

    const blueprint = reactive<IMapBlueprint>({
        ready: false,
        layersToAdd: [],
        layersInControl: []
    })

    const { options: componentOptions } = setupMap(props)

    const options: MapOptions = propsToLeafletOptions<MapOptions>(props, componentOptions)

    const leafletObject = computed(() => blueprint.leafletRef)
    const ready = computed(() => blueprint.ready)

    onMounted(async () => {
        try {
            // TODO: Is beforeMapMount still needed?
            if (props.beforeMapMount) {
                await props.beforeMapMount()
            }
        } catch (error: any) {
            console.error(
                `The following error occurred running the provided beforeMapMount hook ${error.message}`
            )
        }
        await resetWebpackIcon(Icon)

        blueprint.leafletRef = markRaw(new Map(root.value!, options))

        propsBinder(methods, blueprint.leafletRef, props)

        bindEventHandlers(blueprint.leafletRef, eventHandlers)
        bindEventHandlers(blueprint.leafletRef, listeners)

        blueprint.ready = true
        nextTick(() => emit('ready', blueprint.leafletRef as Map))
    })

    onBeforeUnmount(() => {
        cancelDebounces(eventHandlers)
        blueprint.leafletRef?.off()
        blueprint.leafletRef?.remove()
    })

    return { root, blueprint, leafletObject, ready }
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
        if (props.padding) {
            result.padding = props.padding
        }
        if (props.paddingTopLeft) {
            result.paddingTopLeft = props.paddingTopLeft
        }
        if (props.paddingBottomRight) {
            result.paddingBottomRight = props.paddingBottomRight
        }
        return result
    })
    return { zoomPanOptions, fitBoundsOptions }
}

function useMethods() {
    function addLayer(layer: ILayerDefinition) {
        if (layer.layerType !== undefined) {
            if (blueprint.layerControl === undefined) {
                blueprint.layersToAdd.push(layer)
            } else {
                const exist = blueprint.layersInControl.find(
                    (l) => Util.stamp(l.leafletObject) === Util.stamp(layer.leafletObject)
                )
                if (!exist) {
                    blueprint.layerControl.addLayer(layer)
                    blueprint.layersInControl.push(layer)
                }
            }
        }
        if (layer.leafletObject && layer.visible !== false) {
            blueprint.leafletRef!.addLayer(layer.leafletObject)
        }
    }

    function removeLayer(layer: ILayerDefinition) {
        if (layer.layerType !== undefined) {
            if (blueprint.layerControl === undefined) {
                blueprint.layersToAdd = blueprint.layersToAdd.filter((l) => l.name !== layer.name)
            } else {
                blueprint.layerControl.removeLayer(layer.leafletObject)
                blueprint.layersInControl = blueprint.layersInControl.filter(
                    (l) => Util.stamp(l.leafletObject) !== Util.stamp(layer.leafletObject)
                )
            }
        }
        if (layer.leafletObject) blueprint.leafletRef!.removeLayer(layer.leafletObject)
    }

    function registerLayerControl(lControlLayer: IControlDefinition<Control.Layers>) {
        blueprint.layerControl = lControlLayer
        blueprint.layersToAdd.forEach((layer) => {
            blueprint.layerControl!.addLayer(layer)
        })
        blueprint.layersToAdd = []

        registerControl(lControlLayer)
    }

    function registerControl(lControl: IControlDefinition) {
        blueprint.leafletRef!.addControl(lControl.leafletObject)
    }

    function setZoom(zoom: number) {
        const currentZoom = blueprint.leafletRef!.getZoom()
        if (zoom !== currentZoom) {
            blueprint.leafletRef!.setZoom(zoom, zoomPanOptions.value)
        }
    }

    function setCrs(crs: CRS) {
        const prevBounds = blueprint.leafletRef!.getBounds()
        blueprint.leafletRef!.options.crs = crs
        blueprint.leafletRef!.fitBounds(prevBounds, {
            animate: false,
            padding: [0, 0]
        })
    }

    function fitBounds(bounds: LatLngBoundsExpression) {
        ;(blueprint.leafletRef! as Map).fitBounds(bounds, fitBoundsOptions.value)
    }

    function setBounds(bounds: LatLngExpression[]) {
        if (!bounds) {
            return
        }
        const newBounds = new LatLngBounds(bounds)
        if (!newBounds.isValid()) {
            return
        }
        const oldBounds = blueprint.lastSetBounds || blueprint.leafletRef!.getBounds()
        const boundsChanged = !oldBounds.equals(newBounds, 0) // set maxMargin to 0 - check exact equals
        if (boundsChanged) {
            blueprint.lastSetBounds = newBounds
            blueprint.leafletRef!.fitBounds(newBounds)
        }
    }

    function setCenter(center: [number, number]) {
        if (center == null) {
            return
        }
        const newCenter = new LatLng(...center)
        const oldCenter = blueprint.lastSetCenter || blueprint.leafletRef!.getCenter()
        if (oldCenter.lat !== newCenter.lat || oldCenter.lng !== newCenter.lng) {
            blueprint.lastSetCenter = newCenter

            blueprint.leafletRef!.panTo(newCenter, zoomPanOptions.value)
        }
    }

    return {
        addLayer,
        removeLayer,
        registerLayerControl,
        registerControl,
        setZoom,
        setCrs,
        fitBounds,
        setBounds,
        setCenter
    }
}

function useEvents() {
    const { listeners, attrs } = remapEvents(useAttrs())
    const eventHandlers: LeafletEventHandlerFnMap = {
        moveend: debounce((_ev: LeafletEvent) => {
            if (!blueprint.leafletRef) return
            /**
             * Triggers when zoom is updated
             * @type {number,string}
             */
            emit('update:zoom', blueprint.leafletRef.getZoom())
            /**
             * Triggers when center is updated
             * @type {object,array}
             */
            emit('update:center', blueprint.leafletRef.getCenter())
            /**
             * Triggers when bounds are updated
             * @type {object}
             */
            emit('update:bounds', blueprint.leafletRef.getBounds())
        }),
        overlayadd(ev) {
            const layer = blueprint.layersInControl.find((l) => l.name === ev.name)

            layer?.updateVisibleProp(true)
        },
        overlayremove(ev) {
            const layer = blueprint.layersInControl.find((l) => l.name === ev.name)
            layer?.updateVisibleProp(false)
        }
    }

    return { listeners, attrs, eventHandlers }
}

function useProvideFunctions() {
    const addLayer = provideLeafletWrapper(AddLayerInjection)
    const removeLayer = provideLeafletWrapper(RemoveLayerInjection)
    const registerControl = provideLeafletWrapper(RegisterControlInjection)
    const registerLayerControl = provideLeafletWrapper(RegisterLayerControlInjection)

    onMounted(() => {
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
