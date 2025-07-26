<script setup lang="ts">
import { LFeatureGroup, LMap, LMarker, LTileLayer } from '../../components'
import { ref } from 'vue'

const zoom = ref<number>(2)
</script>

<template>
    <LMap ref="map" v-model:zoom="zoom" :center="[47.41322, -1.219482]">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        ></LTileLayer>
        <LFeatureGroup>
            <LMarker :lat-lng="[50, 50]"></LMarker>
        </LFeatureGroup>
    </LMap>
</template>

<style></style>
