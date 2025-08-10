<script setup lang="ts">
import { LMap, LTileLayer, LVideoOverlay } from '../../components'
import { ref } from 'vue'
import type { LatLngBoundsExpression, PointExpression } from 'leaflet'

const center = ref<PointExpression>([22.5, -115])
const zoom = ref(5)
const videoUrl = 'https://www.mapbox.com/bites/00188/patricia_nasa.webm'
const videoBounds = [
    [32, -130],
    [13, -100],
] as LatLngBoundsExpression
</script>

<template>
    <LMap ref="map" v-model:zoom="zoom" :center="center" :minZoom="-5">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        ></LTileLayer>
        <LVideoOverlay :video="videoUrl" :bounds="videoBounds"></LVideoOverlay>
    </LMap>
</template>
