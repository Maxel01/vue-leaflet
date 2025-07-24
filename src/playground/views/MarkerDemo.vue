<script setup lang="ts">
import { LMap, LMarker, LTileLayer } from '../../components'
import type { LatLngTuple } from 'leaflet'
import { ref } from 'vue'

const zoom = ref<number>(2)
const coordinates: LatLngTuple = [50, 50]
</script>

<template>
    <LMap ref="map" v-model:zoom="zoom" :center="[47.41322, -1.219482]">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        ></LTileLayer>

        <LMarker :lat-lng="coordinates" draggable></LMarker>
    </LMap>
</template>

<style scoped></style>
