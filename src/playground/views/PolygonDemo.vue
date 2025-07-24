<script setup lang="ts">
import { LMap, LPolygon, LTileLayer } from '../../components'
import { ref } from 'vue'

const zoom = ref<number>(5)
</script>

<template>
    <LMap ref="map" v-model:zoom="zoom" :center="[24.886, -70.268]">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        ></LTileLayer>

        <LPolygon
            :lat-lngs="[
                [25.774, -80.19],
                [18.466, -66.118],
                [32.321, -64.757],
                [25.774, -80.19],
            ]"
            color="#41b782"
            :fill="true"
            :fillOpacity="0.5"
            fillColor="#41b782"
        />
    </LMap>
</template>

<style></style>
