<script setup lang="ts">
import { LMap, LRectangle, LTileLayer } from '@/maxel01/vue-leaflet'
</script>

<template>
    <LMap zoom="9" :center="[46.41322, -1.219482]">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        />

        <LRectangle
            :lat-lngs="[
                [46.334852, -1.509485],
                [46.342596, -1.328731],
                [46.241487, -1.190568],
                [46.234787, -1.358337],
                [46.294733, -1.234567]
            ]"
            :fill="true"
            color="#35495d"
        />
        <LRectangle
            :bounds="[
                [46.5, -1],
                [46.6, -1.1]
            ]"
        />
    </LMap>
</template>
