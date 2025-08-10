<script setup lang="ts">
import { computed, ref } from 'vue'

import { LMap, LMarker, LPopup, LSVGOverlay } from '../../components'
import { CRS, type LatLngBoundsLiteral } from 'leaflet'

const width = ref(100)
const height = ref(100)
const zoom = ref(1)

const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
svgElement.setAttribute('viewBox', '0 0 200 200')
svgElement.innerHTML = '<rect width="200" height="200"/><rect x="75" y="23" width="50" height="50" style="fill:red"/><rect x="75" y="123" width="50" height="50" style="fill:#0013ff"/>'


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

const bounds = computed(
    () =>
        [
            [0, 0],
            [height.value, width.value]
        ] as LatLngBoundsLiteral
)
const crs = CRS.Simple
</script>

<template>
    <LMap ref="map" v-model:zoom="zoom" :crs="crs" :center="[height / 2, width / 2]" :minZoom="-5">
        <LSVGOverlay :svg="svgElement" :bounds="bounds"></LSVGOverlay>

        <LMarker v-for="(marker, idx) in markers" :key="idx" :lat-lng="marker.coordinates">
            <LPopup>{{ idx }}</LPopup>
        </LMarker>
    </LMap>

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
