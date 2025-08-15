<script setup lang="ts">
import { LMap, LMarker, LTileLayer } from '@maxel01/vue-leaflet'
import type { LatLngTuple } from 'leaflet'

const coordinates: LatLngTuple = [50, 50]
</script>

<template>
    <LMap :zoom="2" :center="[47.41322, -1.219482]">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        />
        <LMarker :lat-lng="coordinates" draggable />
    </LMap>
</template>
