<script setup lang="ts">
import { LMap, LTileLayer } from '../../components'
import type { MapOptions } from 'leaflet'

const mapOptions: MapOptions = {
    center: [51.505, -0.09],
    zoom: 13
}
function onZoom(zoom: number) {
    console.log('ZOOM', zoom)
}
</script>

<template>
    <LMap ref="map" :mapOptions="mapOptions" @update:zoom="onZoom">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        ></LTileLayer>
    </LMap>
</template>

<style></style>
