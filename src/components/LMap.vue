<script setup lang="ts">
import {
    computed,
    markRaw,
    nextTick,
    onBeforeUnmount,
    onMounted,
    reactive,
    ref, useAttrs
} from 'vue'
import {
    type CRS,
    type FitBoundsOptions, Icon,
    LatLng,
    LatLngBounds, type LatLngBoundsExpression, type LatLngExpression,
    type LeafletEvent,
    type LeafletEventHandlerFnMap,
    Map,
    type MapOptions, type PointExpression,
    TileLayer, Util,
    type ZoomPanOptions
} from 'leaflet'
import { debounce } from 'ts-debounce'
import {
    bindEventHandlers,
    cancelDebounces, propsBinder,
    provideLeafletWrapper,
    remapEvents,
    resetWebpackIcon, updateLeafletWrapper
} from '../utils.ts'
import type { ILayerDefinition, IControlDefinition } from '../types/interfaces'
import {
    AddLayerInjection,
    RegisterControlInjection, RegisterLayerControlInjection,
    RemoveLayerInjection
} from '../types/injectionKeys.ts'

interface IMapBlueprint {
    ready: boolean;
    leafletRef?: Map;
    layerControl?: any; // TODO: Proper typing, based on argument to registerLayerControl called in LControlLayers.vue
    layersToAdd: any[]; // TODO: Proper typing
    layersInControl: any[]; // TODO: Proper typing
    lastSetBounds?: LatLngBounds;
    lastSetCenter?: LatLng;
}

const props = defineProps<{
    mapOptions?: MapOptions,
    bounds?: LatLngBounds,
    padding?: PointExpression,
    paddingTopLeft?: PointExpression,
    paddingBottomRight?: PointExpression,
    noBlockingAnimations?: boolean,
    beforeMapMount?: () => void | Promise<void>
}>()

const mapRoot = ref<HTMLElement>()

const blueprint = reactive<IMapBlueprint>({
    ready: false,
    layersToAdd: [],
    layersInControl: []
})
const leafletObject = computed(() => blueprint.leafletRef);
const ready = computed(() => blueprint.ready);

const { listeners, _attrs } = remapEvents(useAttrs())

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

    updateLeafletWrapper(addLayer, methods.addLayer);
    updateLeafletWrapper(removeLayer, methods.removeLayer);
    updateLeafletWrapper(registerControl, methods.registerControl);
    updateLeafletWrapper(registerLayerControl, methods.registerLayerControl);

    blueprint.leafletRef = markRaw(new Map(mapRoot.value!, props.mapOptions))

    propsBinder(methods, blueprint.leafletRef, props);

    new TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(blueprint.leafletRef as Map)

    bindEventHandlers(blueprint.leafletRef, eventHandlers)
    bindEventHandlers(blueprint.leafletRef, listeners)

    blueprint.ready = true
    nextTick(() => emit('ready', blueprint.leafletRef as Map))
})

onBeforeUnmount(() => {
    cancelDebounces(eventHandlers)
    if (blueprint.leafletRef) {
        blueprint.leafletRef.off()
        blueprint.leafletRef.remove()
    }
})

const addLayer = provideLeafletWrapper(AddLayerInjection);
const removeLayer = provideLeafletWrapper(RemoveLayerInjection);
const registerControl = provideLeafletWrapper(RegisterControlInjection);
const registerLayerControl = provideLeafletWrapper(
    RegisterLayerControlInjection
);

const methods = {
    addLayer(layer: ILayerDefinition) {
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
        if (layer.visible !== false) {
            blueprint.leafletRef!.addLayer(layer.leafletObject)
        }
    },
    removeLayer(layer: ILayerDefinition) {
        if (layer.layerType !== undefined) {
            if (blueprint.layerControl === undefined) {
                blueprint.layersToAdd = blueprint.layersToAdd.filter(
                    (l) => l.name !== layer.name
                )
            } else {
                blueprint.layerControl.removeLayer(layer.leafletObject)
                blueprint.layersInControl = blueprint.layersInControl.filter(
                    (l) => Util.stamp(l.leafletObject) !== Util.stamp(layer.leafletObject)
                )
            }
        }
        blueprint.leafletRef!.removeLayer(layer.leafletObject)
    },
    registerLayerControl(
        lControlLayer: IControlDefinition<L.Control.Layers>
    ) {
        blueprint.layerControl = lControlLayer
        blueprint.layersToAdd.forEach((layer) => {
            blueprint.layerControl!.addLayer(layer)
        })
        blueprint.layersToAdd = []

        methods.registerControl(lControlLayer)
    },
    registerControl(lControl: IControlDefinition) {
        blueprint.leafletRef!.addControl(lControl.leafletObject)
    },
    setZoom(zoom: number) {
        const currentZoom = blueprint.leafletRef!.getZoom()
        if (zoom !== currentZoom) {
            blueprint.leafletRef!.setZoom(zoom, zoomPanOptions.value)
        }
    },
    setCrs(crs: CRS) {
        const prevBounds = blueprint.leafletRef!.getBounds()
        blueprint.leafletRef!.options.crs = crs
        blueprint.leafletRef!.fitBounds(prevBounds, {
            animate: false,
            padding: [0, 0]
        })
    },
    fitBounds(bounds: LatLngBoundsExpression) {
        (blueprint.leafletRef! as Map).fitBounds(bounds, fitBoundsOptions.value)
    },
    setBounds(bounds: LatLngExpression[]) {
        if (!bounds) {
            return
        }
        const newBounds = new LatLngBounds(bounds)
        if (!newBounds.isValid()) {
            return
        }
        const oldBounds =
            blueprint.lastSetBounds || blueprint.leafletRef!.getBounds()
        const boundsChanged = !oldBounds.equals(newBounds, 0) // set maxMargin to 0 - check exact equals
        if (boundsChanged) {
            blueprint.lastSetBounds = newBounds
            blueprint.leafletRef!.fitBounds(newBounds)
        }
    },

    setCenter(center: [number, number]) {
        if (center == null) {
            return
        }
        const newCenter = new LatLng(...center)
        const oldCenter =
            blueprint.lastSetCenter || blueprint.leafletRef!.getCenter()
        if (
            oldCenter.lat !== newCenter.lat ||
            oldCenter.lng !== newCenter.lng
        ) {
            blueprint.lastSetCenter = newCenter

            blueprint.leafletRef!.panTo(newCenter, zoomPanOptions.value)
        }
    }
}


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

const eventHandlers: LeafletEventHandlerFnMap = {
    moveend: debounce((_ev: LeafletEvent) => {
        if (!blueprint.leafletRef) return
        /**
         * Triggers when zoom is updated
         * @type {number,string}
         */
        emit('update:zoom', (blueprint.leafletRef as Map).getZoom())
        /**
         * Triggers when center is updated
         * @type {object,array}
         */
        emit('update:center', (blueprint.leafletRef as Map).getCenter())

        /**
         * Triggers when bounds are updated
         * @type {object}
         */
        emit('update:bounds', (blueprint.leafletRef as Map).getBounds())
    }),
    overlayadd(ev) {
        const layer = blueprint.layersInControl.find((l) => l.name === ev.name)
        if (layer) {
            layer.updateVisibleProp(true)
        }
    },
    overlayremove(ev) {
        const layer = blueprint.layersInControl.find((l) => l.name === ev.name)
        if (layer) {
            layer.updateVisibleProp(false)
        }
    }
}

const emit = defineEmits<{
    (event: 'ready', map: Map): void
    (event: 'update:zoom', zoom: number): void
    (event: 'update:center', center: LatLng): void
    (event: 'update:bounds', center: LatLngBounds): void
}>()
</script>

<template>
    <div ref="mapRoot" class="fill">
        <slot v-if="ready" />
    </div>
</template>

<style scoped>
.fill {
    width: 100%;
    height: 100%;
}
</style>
