<script setup lang="ts">
import { LControlScale, LMap, LTileLayer } from '../../components'
</script>

<template>
    <LMap ref="map" :zoom="2" :center="[47.41322, -1.219482]">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        ></LTileLayer>
        <LControlScale position="bottomleft" />
    </LMap>
</template>

<style></style>
