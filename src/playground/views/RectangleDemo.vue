<script setup lang="ts">
import { LMap, LRectangle, LTileLayer } from '../../components'
import { ref } from 'vue'
import type { LatLngExpression } from 'leaflet'

const zoom = ref<number>(8)
</script>

<template>
    <LMap ref="map" v-model:zoom="zoom" :center="[46.41322, 0.219482]">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        ></LTileLayer>

        <LRectangle
            :lat-lngs="[
                [46.334852, -1.509485],
                [46.342596, -1.328731],
                [46.241487, -1.190568],
                [46.234787, -1.358337],
                [46.294733, -1.234567],
            ]"
            :fill="true"
            color="#35495d"
        />
        <LRectangle
            :bounds="[
                [46.5, -1],
                [46.6, -1.1],
            ] as LatLngExpression[]"
        ></LRectangle>
    </LMap>
</template>

<style></style>
