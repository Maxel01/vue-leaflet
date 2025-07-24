import type { Icon, LatLngExpression, LeafletEvent, Marker, MarkerOptions } from 'leaflet'
import type { Ref, Slots, VNode } from 'vue'

import { type LayerEmits, type LayerProps, layerPropsDefaults, setupLayer } from './layer'
import { propsToLeafletOptions } from '../utils.ts'

const unrenderedContentTypes = ['Symbol(Comment)', 'Symbol(Text)']
const unrenderedComponentNames = ['LTooltip', 'LPopup']

export interface MarkerProps extends LayerProps<MarkerOptions> {
    draggable?: boolean
    icon?: Icon
    zIndexOffset?: number
    latLng: LatLngExpression
}

export const markerPropsDefaults = {
    ...layerPropsDefaults,
    draggable: undefined,
}

export type MarkerEmits = LayerEmits & {
    (event: 'ready', marker: Marker): void
    (event: 'update:latLng', value: LatLngExpression): void
    (event: 'update:lat-lng', value: LatLngExpression): void
}

export const setupMarker = (
    props: MarkerProps,
    leafletRef: Ref<Marker | undefined>,
    emit: MarkerEmits,
) => {
    const { options: layerOptions, methods: layerMethods } = setupLayer(props, leafletRef, emit)

    const options = propsToLeafletOptions<MarkerOptions>(props, layerOptions)

    const methods = {
        ...layerMethods,
        setDraggable(value: boolean) {
            if (value) leafletRef.value?.dragging?.enable()
            else leafletRef.value?.dragging?.disable()
        },
        latLngSync(
            event: LeafletEvent & { latlng?: LatLngExpression; oldLatLng?: LatLngExpression },
        ) {
            if (event.latlng) {
                emit('update:latLng', event.latlng)
                emit('update:lat-lng', event.latlng)
            }
        },
        setLatLng(newVal: LatLngExpression) {
            if (leafletRef.value) {
                const oldLatLng = leafletRef.value.getLatLng()
                if (!oldLatLng || !oldLatLng.equals(newVal)) {
                    leafletRef.value.setLatLng(newVal)
                }
            }
        },
    }

    return { options, methods }
}

/**
 * Determine whether the default Leaflet icon should be replaced with a blank div initially.
 *
 * @param {*} slots slots object returned by useSlots()
 * @returns boolean
 */
export const shouldBlankIcon = (slots: Slots) => {
    // If there is content within the <LMarker>, and it contains anything other than a
    // tooltip for the marker, then the icon should be replaced with an empty div on
    // creation so that Leaflet does not render its default icon momentarily before
    // Vue mounts the inner content and vue-leaflet updates the marker with it.
    // See https://github.com/vue-leaflet/vue-leaflet/issues/170
    const slotContent = slots.default?.()
    return !!slotContent?.length && slotContent.some(contentIsRendered)
}

function contentIsRendered(el: VNode) {
    if (unrenderedContentTypes.includes(el.type.toString())) return false
    return (
        typeof el.type === 'object' &&
        '__name' in el.type &&
        !unrenderedComponentNames.includes(el.type.__name || '')
    )
}
