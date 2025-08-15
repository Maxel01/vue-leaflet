<script setup lang="ts">
import { LMap, LTileLayer, LLayerGroup, LMarker } from '@maxel01/vue-leaflet'
</script>

<template>
    <LMap style="height: 350px" :zoom="8" :center="[47.21322, -1.559482]">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            layer-type="base"
            name="OpenStreetMap"
        />
        <LLayerGroup>
            <LMarker :lat-lng="[47.21322, -1.559482]" />
            <LMarker :lat-lng="[47.01322, -1.359482]" />
        </LLayerGroup>
    </LMap>
</template>
