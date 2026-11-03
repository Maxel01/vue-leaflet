<script setup lang="ts">
import { LGeoJson, LMap, LTileLayer } from '@maxel01/vue-leaflet'
import { ref } from 'vue'

import communes from '../data/communes.json'

const geojson = ref(communes)
const geoStyler = (feature: any) => ({
    opacity: Number(feature.properties.code) / 100000,
    fillOpacity: 0.5
})
</script>

<template>
    <LMap :zoom="8" :center="[47.57, -0.76]">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        />
        <LGeoJson :geojson="geojson" :options-style="geoStyler" />
    </LMap>
</template>
