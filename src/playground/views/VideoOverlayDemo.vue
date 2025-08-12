<script setup lang="ts">
import { LMap, LTileLayer, LVideoOverlay } from '../../components'

/**
 * TODO Video doesn't seem to work in vitepress but works in playground.
 */
const videoUrl = 'https://www.mapbox.com/bites/00188/patricia_nasa.webm'
const videoBounds = [
    [32, -130],
    [13, -100]
]
</script>

<template>
    <LMap :zoom="5" :center="[22.5, -115]" :minZoom="-5">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        />
        <LVideoOverlay :video="videoUrl" :bounds="videoBounds"/>
    </LMap>
</template>
