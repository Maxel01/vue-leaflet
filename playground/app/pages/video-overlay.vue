<script setup lang="ts">
import { LMap, LTileLayer, LVideoOverlay } from '@maxel01/vue-leaflet'
import { LatLngBounds } from 'leaflet'

const videoUrl = 'https://www.mapbox.com/bites/00188/patricia_nasa.webm'
const videoBounds = new LatLngBounds([
    [32, -130],
    [13, -100]
])
</script>

<template>
    <LMap :zoom="4" :center="[22.5, -115]" :minZoom="-5">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        />
        <LVideoOverlay :video="videoUrl" :bounds="videoBounds" />
    </LMap>
</template>
