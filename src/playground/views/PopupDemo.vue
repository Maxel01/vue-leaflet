<script setup lang="ts">
import {
    LCircle,
    LCircleMarker,
    LLayerGroup,
    LMap,
    LMarker,
    LPolygon,
    LPolyline,
    LPopup,
    LRectangle,
    LTileLayer,
} from '../../components'
import { ref } from 'vue'

const zoom = ref<number>(9)
const coordinates = ref({ lat: 41.75, lng: -87.65 })
</script>

<template>
    <LMap ref="map" v-model:zoom="zoom" :center="[41.8329, -87.7327]">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        ></LTileLayer>

        <LMarker :lat-lng="[41.8329, -87.7327]">
            <LPopup> Hi! I'm staying here on this location!</LPopup>
        </LMarker>

        <LLayerGroup>
            <LMarker :lat-lng="coordinates" draggable>
                <LPopup> Hi! You can drag me around!</LPopup>
            </LMarker>
        </LLayerGroup>

        <LPolygon
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
            <LPopup> Hi! I'm a polygon, nice to meet you!</LPopup>
        </LPolygon>

        <LPolyline
            :lat-lngs="[
                [41.9329, -87.9327],
                [41.8329, -87.8327],
            ]"
            color="green"
        >
            <l-popup> Hey! Polyline here, at your service!</l-popup>
        </LPolyline>

        <LRectangle
            :lat-lngs="[
                [41.734852, -86.809485],
                [41.742596, -86.628731],
                [41.641487, -86.590568],
                [41.634787, -86.658337],
            ]"
            :fill="true"
            color="#35495d"
        >
            <LPopup> Good day! Rectangle is my name!</LPopup>
        </LRectangle>

        <LCircle :lat-lng="[41.4329, -87.7327]" :radius="10000" color="green">
            <LPopup> Hi! I'm a green Circle!</LPopup>
        </LCircle>

        <LCircleMarker :lat-lng="[41.4329, -87.95]" :radius="20">
            <LPopup> Hi! You can call me Circle Marker!</LPopup>
        </LCircleMarker>
    </LMap>
</template>

<style></style>
