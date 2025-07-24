<script setup lang="ts">
import { LIcon, LMap, LMarker, LTileLayer, LTooltip } from '../../components'
import type { LatLngExpression } from 'leaflet'
import { ref } from 'vue'

const zoom = ref<number>(9)
const coordinates = ref<LatLngExpression>([41.75, -87.65])
</script>

<template>
    <LMap ref="map" v-model:zoom="zoom" :center="[41.8329, -87.7327]">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        ></LTileLayer>

        <LMarker :lat-lng="[41.8329, -87.7327]">
            <LTooltip> Hi! I'm staying here on this location!</LTooltip>
        </LMarker>

        <LMarker :lat-lng="coordinates" draggable>
            <LTooltip> Hi! You can drag me around!</LTooltip>
        </LMarker>

        <LMarker :lat-lng="[41.7654, -87.219482]">
            <LIcon icon-url="https://placekitten.com/32/32" :icon-size="[32, 48]" />
            <LTooltip> What a tiny kitten</LTooltip>
        </LMarker>

        <LMarker :lat-lng="[41.61322, -87.219482]">
            <LIcon>
                <div class="div-icon">Custom HTML icon</div>
            </LIcon>
            <LTooltip> And with a tooltip too!</LTooltip>
        </LMarker>

        <!--LPolygon
        :lat-lngs="[
            [41.6329, -87.5327],
            [41.5329, -87.2327],
            [41.3329, -87.3327],
            [41.6329, -87.5327],
        ]"
        color="#41b782"
        :fill="true"
        :fillOpacity="0.5"
        fillColor="#41b782"
    >
        <LTooltip> Hi! I'm a polygon, nice to meet you!</LTooltip>
    </LPolygon-->

        <!--LPolyline
        :lat-lngs="[
            [41.9329, -87.9327],
            [41.8329, -87.8327],
        ]"
        color="green"
    >
        <LTooltip> Hey! Polyline here, at your service!</LTooltip>
    </LPolyline-->

        <!--LRectangle
        :lat-lngs="[
            [41.734852, -86.809485],
            [41.742596, -86.628731],
            [41.641487, -86.590568],
            [41.634787, -86.658337],
        ]"
        :fill="true"
        color="#35495d"
    >
        <LTooltip> Good day! Rectangle is my name!</LTooltip>
    </LRectangle-->

        <!--LCircle :lat-lng="[41.4329, -87.7327]" :radius="10000" color="green">
        <LTooltip> Hi! I'm a green Circle!</LTooltip>
    </LCircle-->

        <!--LCircleMarker :lat-lng="[41.4329, -87.95]" :radius="20">
        <LTooltip> Hi! You can call me Circle Marker!</LTooltip>
    </LCircleMarker-->
    </LMap>
</template>

<style>
.div-icon {
    background-color: skyblue;
    width: fit-content;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px blue solid;
}
</style>
