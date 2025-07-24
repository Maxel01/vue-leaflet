<script setup lang="ts">
import { LMap, LPolyline, LTileLayer } from '../../components'
import { ref } from 'vue'

const zoom = ref<number>(9)
</script>

<template>
    <LMap ref="map" v-model:zoom="zoom" :center="[47.41322, -1.219482]">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        ></LTileLayer>

        <LPolyline
            :lat-lngs="[
                [47.334852, -1.509485],
                [47.342596, -1.328731],
                [47.241487, -1.190568],
                [47.234787, -1.358337],
            ]"
            color="green"
        />
    </LMap>
</template>

<style></style>
