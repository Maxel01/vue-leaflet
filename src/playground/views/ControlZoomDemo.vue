<script setup lang="ts">
import { LControlZoom, LMap, LTileLayer } from '@/maxel01/vue-leaflet'
</script>

<template>
    <LMap ref="map" :zoom="2" :center="[47.41322, -1.219482]">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        />
        <LControlZoom position="bottomright" zoom-in-text="*" zoom-out-text="/" />
    </LMap>
</template>
