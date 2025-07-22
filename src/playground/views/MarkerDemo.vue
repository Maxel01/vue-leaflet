<script setup lang="ts">
import { LMap, LTileLayer, LMarker } from '../../components'
import type { LatLngTuple, MapOptions, MarkerOptions } from 'leaflet'

const mapOptions: MapOptions = {
    center: [47.41322, -1.219482],
    zoom: 2,
}
const coordinates: LatLngTuple = [50, 50]
const markerOptions: MarkerOptions = {
    draggable: true
}
</script>

<template>
    <LMap ref="map" :map-options="mapOptions">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        ></LTileLayer>

        <LMarker :lat-lng="coordinates" :layer-options="markerOptions"></LMarker>
    </LMap>
</template>

<style scoped></style>
