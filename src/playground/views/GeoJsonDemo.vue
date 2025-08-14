<script setup lang="ts">
import { LGeoJson, LMap, LTileLayer } from '@/maxel01/vue-leaflet'
import { onMounted, ref } from 'vue'

const geojson = ref(undefined)
const geoStyler = (feature) => ({
    opacity: feature.properties.code / 100000
})

onMounted(async () => {
    const response = await fetch(
        'https://rawgit.com/gregoiredavid/france-geojson/master/regions/pays-de-la-loire/communes-pays-de-la-loire.geojson'
    )
    geojson.value = await response.json()
})
</script>

<template>
    <LMap :zoom="8" :center="[47.41322, -1.219482]">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        />
        <LGeoJson :geojson="geojson" :options-style="geoStyler" />
    </LMap>
</template>
