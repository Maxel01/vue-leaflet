<script setup lang="ts">
import type { PropType } from 'vue'
import type { PointExpression } from 'leaflet'

const props = defineProps({
    /**
     * The center of the map, supports .sync modifier
     */
    center: {
        type: [Object, Array] as PropType<PointExpression>,
    },
    /**
     * The bounds of the map, supports .sync modifier
     */
    bounds: {
        type: [Array, Object],
    },
    /**
     * The max bounds of the map
     */
    maxBounds: {
        type: [Array, Object],
    },
    /**
     * The zoom of the map, supports .sync modifier
     */
    zoom: {
        type: Number,
    },
    /**
     * The minZoom of the map
     */
    minZoom: {
        type: Number,
    },
    /**
     * The maxZoom of the map
     */
    maxZoom: {
        type: Number,
    },
    /**
     * The paddingBottomRight of the map
     */
    paddingBottomRight: {
        type: [Object, Array] as PropType<PointExpression>,
    },
    /**
     * The paddingTopLeft of the map
     */
    paddingTopLeft: {
        type: Object as PropType<PointExpression>,
    },
    /**
     * The padding of the map
     */
    padding: {
        type: PointExpression
    },
    /**
     * The worldCopyJump option for the map
     */
    worldCopyJump: {
        type: Boolean,
        default: undefined,
    },
    /**
     * The CRS to use for the map. Can be an object that defines a coordinate reference
     * system for projecting geographical points into screen coordinates and back
     * (see https://leafletjs.com/reference-1.7.1.html#crs-l-crs-base), or a string
     * name identifying one of Leaflet's defined CRSs, such as "EPSG4326".
     */
    crs: {
        type: [String, Object],
    },
    maxBoundsViscosity: {
        type: Number,
    },
    inertia: {
        type: Boolean,
        default: undefined,
    },
    inertiaDeceleration: {
        type: Number,
    },
    inertiaMaxSpeed: {
        type: Number,
    },
    easeLinearity: {
        type: Number,
    },
    zoomAnimation: {
        type: Boolean,
        default: undefined,
    },
    zoomAnimationThreshold: {
        type: Number,
    },
    fadeAnimation: {
        type: Boolean,
        default: undefined,
    },
    markerZoomAnimation: {
        type: Boolean,
        default: undefined,
    },
    noBlockingAnimations: {
        type: Boolean,
        default: undefined,
    }
})
</script>
