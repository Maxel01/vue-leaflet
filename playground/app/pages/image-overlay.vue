<script setup lang="ts">
import { computed, ref } from 'vue'

import { LImageOverlay, LMap, LMarker, LPopup } from '@maxel01/vue-leaflet'
import { CRS, type LatLngBoundsLiteral } from 'leaflet'

const imageOverlayUrl = ref(
    'https://www.printablee.com/postpic/2011/06/blank-100-square-grid-paper_405041.jpg'
)
const width = ref(100)
const height = ref(100)

const bounds = computed(
    () =>
        [
            [0, 0],
            [height.value, width.value]
        ] as LatLngBoundsLiteral
)

const markers = ref([
    { coordinates: { lng: 0, lat: 0 } },
    { coordinates: { lng: 100, lat: 0 } },
    { coordinates: { lng: 0, lat: 100 } },
    { coordinates: { lng: 100, lat: 100 } },
    { coordinates: { lng: 0, lat: 50 } },
    { coordinates: { lng: 50, lat: 0 } },
    { coordinates: { lng: 50, lat: 100 } },
    { coordinates: { lng: 100, lat: 50 } }
])
</script>

<template>
    <LMap :zoom="1" :crs="CRS.Simple" :center="[height / 2, width / 2]" :minZoom="-5">
        <LImageOverlay :url="imageOverlayUrl" :bounds="bounds"></LImageOverlay>

        <LMarker v-for="(marker, idx) in markers" :key="idx" :lat-lng="marker.coordinates">
            <LPopup>{{ idx }}</LPopup>
        </LMarker>
    </LMap>

    <!-- Map Settings -->
    <label for="imageOverlayUrl">Url to render: </label>
    <input
        type="text"
        id="imageOverlayUrl"
        placeholder="Url for image overlay"
        v-model="imageOverlayUrl"
    />
    <br>
    <!-- Bounds settings -->
    <label for="width">Width: </label>
    <input type="number" id="width" placeholder="Width" v-model="width" />
    <label for="height">Height: </label>
    <input type="number" id="height" placeholder="Height" v-model="height" />

    <!-- Marker settings -->
    <div class="markers-list">
        <h4>Markers</h4>
        <ul>
            <li v-for="(marker, idx) in markers" :key="idx">
                {{ idx }} - lng (X): {{ marker.coordinates.lng }} - lat (Y):
                {{ marker.coordinates.lat }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
input {
    border: 1px solid;
}
</style>
